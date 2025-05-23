import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_DATABASE || "quanlyhososinhvien",
  port: process.env.DB_PORT || 5433, // PostgreSQL mặc định là 5432
  max: 10, // connectionLimit tương đương
  idleTimeoutMillis: 30000, // tuỳ chọn: ngắt kết nối sau 30s không hoạt động
  connectionTimeoutMillis: 3000, // timeout khi kết nối
});

const checkConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Database Connection Successful!");
    client.release();
  } catch (error) {
    console.error("Error connecting to PostgreSQL!");
    throw error;
  }
};

export { pool, checkConnection };

// import pkg from "pg";
// const { Pool } = pkg;
// import dotenv from "dotenv";

// dotenv.config();

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 5432, // PostgreSQL mặc định là 5432
//   max: 10, // connectionLimit tương đương
//   idleTimeoutMillis: 30000, // tuỳ chọn: ngắt kết nối sau 30s không hoạt động
//   connectionTimeoutMillis: 2000, // timeout khi kết nối
// });

// const checkConnection = async () => {
//   try {
//     const client = await pool.connect();
//     console.log("Database Connection Successful!");
//     client.release();
//   } catch (error) {
//     console.error("Error connecting to PostgreSQL!");
//     throw error;
//   }
// };

// export { pool, checkConnection };

// Create tables if they don't exist
await pool.query(`
  CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    amount DECIMAL(18,8) NOT NULL,
    transaction_hash VARCHAR(66) NOT NULL,
    from_address VARCHAR(42) NOT NULL,
    to_address VARCHAR(42) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'completed',
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);
