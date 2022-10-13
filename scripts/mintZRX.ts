import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Wallet } from "ethers";
import { ethers } from "hardhat";
import { ZRXNft } from "../typechain-types";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()


async function main() {

  const [...accounts] = await ethers.getSigners()

  const network = await ethers.provider.getNetwork()
  console.log(network);
  let ZRXAddress = process.env.GOERLI_ZRX_CONTRACT_ADDRESS || ''
  if (network.name === 'main'){
    ZRXAddress = process.env.MAIN_ZRX_CONTRACT_ADDRESS || ''
  }
  const ZRXNFT = await ethers.getContractAt("ZRXNft", ZRXAddress);
  console.log('start mint：\n', accounts.map(a=>a.address).join('\n'));

  for (let index = 0; index < accounts.length; index++) {
    const minter = accounts[index]
    const accountBalance = await minter.getBalance()
    console.log(index, minter.address, ethers.utils.formatEther(accountBalance));
    try {
      await mint(minter, ZRXNFT)
    } catch (error) {
      console.log(minter.address, error);
    }
  }
  console.log('mint end')
}

async function mint(minter: Wallet | SignerWithAddress, ZRXNFT: ZRXNft) {
  try {
    const count = await ZRXNFT.balanceOf(minter.address)
    console.log(count.toNumber());
    if (count.toNumber() == 2) {
      return true;
    }
    if (count.toNumber() == 1) {
      await mintOne(minter, ZRXNFT)
      return true;
    }
    await mintOne(minter, ZRXNFT)
    await mintOne(minter, ZRXNFT)
    return true;
  } catch (error) {
    console.log('error', minter.address, error);
  }
}

export async function mintOne(minter: Wallet | SignerWithAddress, ZRXNFT: ZRXNft) {
  const signatureRes: IMintSignature = await axios.post(process.env.API_URL || '', {
    address: minter.address,
    apiKey: process.env.API_KEY
  }).then(res => res.data.data)
  return ZRXNFT.connect(minter).mint(signatureRes, { value: ethers.utils.parseEther('0.0048') })
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
