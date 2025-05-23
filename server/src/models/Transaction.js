import { pool } from '../config/db.js';

class Transaction {
  constructor(data) {
    this.userId = data.userId;
    this.amount = data.amount;
    this.transactionHash = data.transactionHash;
    this.fromAddress = data.fromAddress;
    this.toAddress = data.toAddress;
    this.status = data.status || 'completed';
    this.timestamp = data.timestamp || new Date();
  }

  static async create(transactionData) {
    const query = `
      INSERT INTO transactions (user_id, amount, transaction_hash, from_address, to_address, status, timestamp)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      transactionData.userId,
      transactionData.amount,
      transactionData.transactionHash,
      transactionData.fromAddress,
      transactionData.toAddress,
      transactionData.status,
      transactionData.timestamp
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  static async findByUserId(userId) {
    const query = `
      SELECT * FROM transactions 
      WHERE user_id = $1 
      ORDER BY timestamp DESC
    `;

    try {
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error('Error finding transactions:', error);
      throw error;
    }
  }
}

export default Transaction; 