import { ec as EC } from 'elliptic';
import * as crypto from 'crypto';

const ec = new EC('secp256k1');

export interface ITransaction {
  isValid: any;
  fromAddress: string | null;
  toAddress: string;
  amount: number;
  signature?: string;
  timestamp: number;
}

export class Transaction implements ITransaction {
  constructor(
    public fromAddress: string | null,
    public toAddress: string,
    public amount: number,
    public signature?: string,
    public timestamp: number = Date.now()
  ) {}

  calculateHash(): string {
    return crypto
      .createHash('sha256')
      .update(this.fromAddress + this.toAddress + this.amount + this.timestamp)
      .digest('hex');
  }

  signTransaction(signingKey: EC.KeyPair): void {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign transactions for other wallets!');
    }

    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, 'base64');
    this.signature = sig.toDER('hex');
  }

  isValid(): boolean {
    if (this.fromAddress === null) return true;
    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction');
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}
