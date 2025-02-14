import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

export class Wallet {
  public publicKey: string;
  public privateKey: string;

  constructor() {
    const keyPair = ec.genKeyPair();
    this.privateKey = keyPair.getPrivate('hex');
    this.publicKey = keyPair.getPublic('hex');
  }

  static fromPrivateKey(privateKey: string): Wallet {
    const wallet = new Wallet();
    const keyPair = ec.keyFromPrivate(privateKey);
    wallet.privateKey = privateKey;
    wallet.publicKey = keyPair.getPublic('hex');
    return wallet;
  }

  getKeyPair(): EC.KeyPair {
    return ec.keyFromPrivate(this.privateKey);
  }
}
