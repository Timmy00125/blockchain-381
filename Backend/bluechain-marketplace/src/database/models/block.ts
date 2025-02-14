import { IBlock } from '../../blockchain/Block';
import { pool } from '../connection';

export class BlockModel {
  static async create(block: IBlock): Promise<void> {
    const query = `
      INSERT INTO blocks (
        index, timestamp, transactions, previous_hash, hash, nonce
      ) VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await pool.query(query, [
      block.index,
      block.timestamp,
      JSON.stringify(block.transactions),
      block.previousHash,
      block.hash,
      block.nonce,
    ]);
  }

  static async getAll(): Promise<IBlock[]> {
    const { rows } = await pool.query(
      'SELECT * FROM blocks ORDER BY index ASC'
    );
    return rows.map((row) => ({
      ...row,
      transactions: JSON.parse(row.transactions),
    }));
  }
}
