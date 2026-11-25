import pool from '../config/db.js';

export const userRepository = {
    async create({ fullName, email, passwordHash, role = 'CUSTOMER' }, connection = pool
    ) {
        const sql = `INSERT  INTO users (full_name, email, password_hash,role)
        VALUES (?,?,?,?)`;
        const [result] = await connection.query(sql, [fullName, email, passwordHash, role]);

        return {
            id: result.insertId,
            fullName,
            email,
            role
        };
    },

    async findById(id, connection = pool) {
        const sql = `
        SELECT id, full_name, email,role, created_at,updated_at
        FROM users
        WHERE id=?
        `;
        const [rows] = await connection.query(sql, [id]);
        return rows[0] || null;
    },
    async findByEmail(email, connection = pool) {
        const sql = `
        SELECT id,full_name,email, password_hash,role,created_at,updated_at
        FROM users
        WHERE email=?
        `;
        const [rows] = await connection.query(sql, [email]);
        return rows[0] || null;
    },

    async list({ limit = 20, offset = 0 } = {}, connection = pool) {
        const sql = `
            SELECT id,full_name, email, role, created_at
            FROM users ORDER BY id DESC 
            LIMIT ? OFFSET?
        `;
        const [rows] = await connection.query(sql, [Number(limit), Number(offset)]);
        return rows;
    }
};
export default userRepository;
