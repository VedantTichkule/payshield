import fs from 'fs';
import path from 'path';
import pool from './db.js';

const currentDir = import.meta.dirname;
async function runMigrations() {
    console.log("stating database migration");

    const migrationFilePath = path.join(currentDir, '../migrations/001_initial_schema.sql');
    try {
        const sql = fs.readFileSync(migrationFilePath, 'utf8');
        const connection = await pool.getConnection();
        const statements = sql.split(';').map(stmt => stmt.trim()).filter(stmt => stmt.length > 0);
        for (const statement of statements) {
            await connection.query(statement);
        }
        connection.release();
        console.log("database migrations executed successfully all tables created.");;
        process.exit(0);
    } catch (error) {
        console.error("migration failed:", error.message);
        process.exit(1);
    }
}

runMigrations();