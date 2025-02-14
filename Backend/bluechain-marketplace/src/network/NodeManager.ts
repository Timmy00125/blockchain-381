import WebSocket from 'ws';
import { Transaction } from '../blockchain/Transaction';
import { Block } from '../blockchain/Block';

export class NodeManager {
  private peers: Map<string, WebSocket>;

  constructor() {
    this.peers = new Map();
  }

  addPeer(nodeId: string, ws: WebSocket): void {
    this.peers.set(nodeId, ws);
  }

  removePeer(nodeId: string): void {
    this.peers.delete(nodeId);
  }

  broadcastTransaction(transaction: Transaction): void {
    const message = {
      type: 'NEW_TRANSACTION',
      data: transaction,
    };

    this.broadcast(message);
  }

  broadcastBlock(block: Block): void {
    const message = {
      type: 'NEW_BLOCK',
      data: block,
    };

    this.broadcast(message);
  }

  private broadcast(message: any): void {
    this.peers.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    });
  }
}
