import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

//create a connection pool to reuse DB connections across incoming requests
const pool = mysql2.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "payshield_dev",
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    decimalNumbers: true
});

export async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("successfully connected to MYSQl database pool.");
        connection.release();
        return true;
    } catch (error) {
        console.error("Data connection failed:", error.message);
        throw error;
    }
}
export default pool;