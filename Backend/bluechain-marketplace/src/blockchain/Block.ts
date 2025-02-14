import crypto from 'crypto';
import { ITransaction } from './Transaction';

export interface IBlock {
  index: number;
  timestamp: number;
  transactions: ITransaction[];
  previousHash: string;
  hash: string;
  nonce: number;
}

export class Block implements IBlock {
  public hash: string;

  constructor(
    public index: number,
    public timestamp: number,
    public transactions: ITransaction[],
    public previousHash: string,
    public nonce: number = 0
  ) {
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return crypto
      .createHash('sha256')
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.transactions) +
          this.previousHash +
          this.nonce
      )
      .digest('hex');
  }

  mineBlock(difficulty: number): void {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}
