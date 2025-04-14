import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "db.cqmawbwnkgqnfnvaielc.supabase.co",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "Plz8YshCJtlkLg7s",
  database: process.env.DB_DATABASE || "system",
  port: process.env.DB_PORT || 5432, // PostgreSQL mặc định là 5432
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
