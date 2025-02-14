// src/index.ts
import express from 'express';
import { config } from './config/env';
import { apiLimiter } from './api/middleware/rateLimiter';
import { pool } from './database/connection';
import { NodeManager } from './network/NodeManager';
import { Blockchain } from './blockchain/Blockchain';

const app = express();
const nodeManager = new NodeManager();
const blockchain = new Blockchain(config.miningDifficulty, config.miningReward);

// Middleware
app.use(express.json());
app.use(apiLimiter);

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', nodeId: config.nodeId });
});

// Initialize database connection
const initializeDatabase = async () => {
  try {
    await pool.connect();
    console.log('📦 Connected to PostgreSQL database');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  await initializeDatabase();

  app.listen(config.port, () => {
    console.log(`🚀 Server running on port ${config.port}`);
    console.log(`🔗 Node ID: ${config.nodeId}`);
    console.log(`⛏️  Mining difficulty: ${config.miningDifficulty}`);
    console.log(`💰 Mining reward: ${config.miningReward} Blue coins`);
  });
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Performing graceful shutdown...');
  await pool.end();
  process.exit(0);
});

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
