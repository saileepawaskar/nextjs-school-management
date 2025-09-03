import mysql from 'mysql2/promise';

let pool;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306, // ✅ default to 3306 if not set
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  console.log(`✅ Connected to MySQL at ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}`);
} catch (err) {
  console.error('❌ Database connection failed:', err);
  throw err;
}

export default pool;
