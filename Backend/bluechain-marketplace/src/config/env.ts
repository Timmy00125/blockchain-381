import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  dbConnection:
    process.env.DATABASE_URL || 'postgresql://localhost:5432/bluechain',
  nodeId: process.env.NODE_ID || 'node1',
  miningDifficulty: parseInt(process.env.MINING_DIFFICULTY || '4'),
  miningReward: parseInt(process.env.MINING_REWARD || '50'),
};
