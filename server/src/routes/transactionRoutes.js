import express from 'express';
import Transaction from '../models/Transaction.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all transactions for a user
router.get('/user', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching transactions for user:', req.user.id);
    const transactions = await Transaction.findByUserId(req.user.id);
    console.log('Found transactions:', transactions);
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create new transaction
router.post('/', authenticateToken, async (req, res) => {
  console.log('POST /api/transactions called');
  console.log('Request body:', req.body);
  console.log('User from token:', req.user);
  try {
    const { amount, transactionHash, fromAddress, toAddress } = req.body;
    if (!amount || !transactionHash || !fromAddress || !toAddress) {
      console.error('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const transaction = {
      userId: req.user.id,
      amount,
      transactionHash,
      fromAddress,
      toAddress,
      status: 'completed',
      timestamp: new Date().toISOString(),
    };
    console.log('Transaction to save:', transaction);
    const savedTransaction = await Transaction.create(transaction);
    console.log('Transaction saved:', savedTransaction);
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error saving transaction:', error);
    res.status(500).json({ message: 'Error saving transaction', error: error.message });
  }
});

export default router; 