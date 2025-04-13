import { pool } from "../config/db.js";

// Tạo kiểu ENUM cho userType nếu chưa tồn tại
const createEnumTypeQuery = `
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_type_enum') THEN
    CREATE TYPE user_type_enum AS ENUM ('user', 'admin');
  END IF;
END
$$;
`;

const userTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  mobile VARCHAR(15),
  password VARCHAR(255) NOT NULL,
  userType user_type_enum DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const postTableQuery = `
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const createTable = async (tableName, query) => {
  try {
    await pool.query(query);
    console.log(`${tableName} table created or already exists`);
  } catch (error) {
    console.error(`Error creating ${tableName}`, error);
  }
};

const createAllTable = async () => {
  try {
    // Tạo ENUM trước khi tạo bảng
    await pool.query(createEnumTypeQuery);

    await createTable("Users", userTableQuery);
    await createTable("Posts", postTableQuery);

    console.log("✅ All tables created successfully!");
  } catch (error) {
    console.error("❌ Error creating tables", error);
    throw error;
  }
};

export default createAllTable;
