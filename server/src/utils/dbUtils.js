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
  name VARCHAR(100),
  student_id VARCHAR(50) UNIQUE NOT NULL,
  department VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  user_type ENUM('user','admin') DEFAULT 'user',
  wallet_address VARCHAR(255),
  nonce VARCHAR(100),
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
const departmentTableQuery = `
CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);`;

// Bảng Lớp
const classTableQuery = `
CREATE TABLE IF NOT EXISTS classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  department_id INT REFERENCES departments(id) ON DELETE SET NULL
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

    // Tạo bảng theo thứ tự phù hợp với ràng buộc khóa ngoại
    await createTable("Departments", departmentTableQuery);
    await createTable("Classes", classTableQuery);
    await createTable("Users", userTableQuery);
    await createTable("Posts", postTableQuery);

    console.log("✅ All tables created successfully!");
  } catch (error) {
    console.error("❌ Error creating tables", error);
    throw error;
  }
};

export default createAllTable;
