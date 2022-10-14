import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';
dotenv.config()

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{
      version: "0.8.17",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        }
      },
    }],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    goerli: {
      url: process.env.GOERLI_URL_KEY,
      // gasPrice: 2000000000,
      accounts: process.env.PRIVATE_KEY?.replace(/\n/g, '').split(',').filter(t => t !== '')
    },
    main: {
      url: process.env.MAINNET_URL_KEY,
      accounts: process.env.PRIVATE_KEY?.replace(/\n/g, '').split(',').filter(t => t !== ''),
      // gasPrice: 14000000000,
    },
  },
};

export default config;
