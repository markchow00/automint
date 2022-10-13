export {}

declare global {
  interface IMintSignature {
    signature: string;
    signer: string;
    minter: string;
    expiration: number;
  }
}