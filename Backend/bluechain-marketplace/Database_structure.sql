CREATE TABLE blocks (
  id SERIAL PRIMARY KEY,
  index INTEGER NOT NULL UNIQUE,
  timestamp BIGINT NOT NULL,
  transactions JSONB NOT NULL,
  previous_hash VARCHAR(64) NOT NULL,
  hash VARCHAR(64) NOT NULL,
  nonce INTEGER NOT NULL
);

CREATE TABLE wallets (
  public_key VARCHAR(130) PRIMARY KEY,  
  private_key VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  from_address VARCHAR(130),
  to_address VARCHAR(130) NOT NULL,
  amount DECIMAL NOT NULL,
  signature VARCHAR(144),
  timestamp BIGINT NOT NULL,
  block_index INTEGER,
  FOREIGN KEY (block_index) REFERENCES blocks(index)
);

CREATE INDEX idx_blocks_hash ON blocks(hash);
CREATE INDEX idx_transactions_addresses ON transactions(from_address, to_address);