import express from 'express';
import { Blockchain } from '../../blockchain/Blockchain';
import { apiLimiter } from '../middleware/rateLimiter';

const router = express.Router();
const blockchain = new Blockchain();

router.get('/blockchain', apiLimiter, (req, res) => {
  res.json({
    chain: blockchain.chain,
    pendingTransactions: blockchain.pendingTransactions,
  });
});
