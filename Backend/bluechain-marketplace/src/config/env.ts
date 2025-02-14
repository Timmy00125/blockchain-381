import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 3000,
  dbConnection:
    process.env.DATABASE_URL || 'postgresql://localhost:5432/bluechain',
  nodeId: process.env.NODE_ID || 'node1',
  miningDifficulty: Number(process.env.MINING_DIFFICULTY) || 4,
  miningReward: Number(process.env.MINING_REWARD) || 50,
};
