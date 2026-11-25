import pool from '../config/db.js';

export const accountRepository = {
    async create({ walletId = null, accountNumber, name, type }, connection = pool) {
        const sql = `
            INSERT INTO accounts(wallet_id,account_number,name, type)
            VALUES(?,?,?,?)
        `;
        const [result] = await connection.query(sql, [walletId, accountNumber, name, type]);
        return {
            id: result.insertId,
            walletId,
            accountNumber,
            name,
            type
        };
    },
    async findByAccountNumber(accountNumber, connection = pool) {
        const sql = `
            SELECT id, wallet_id, account_number, name, type, created_at
            FROM accounts
            WHERE account_number=?
        `;
        const [rows] = await connection.query(sql, [accountNumber]);
        return rows[0] || null;
    },

    async findById(id, connection = pool) {
        const sql = `
            SELECt id, wallet_id, account_number,name, type, created_at
            FROM accounts
            WHERE id=?
        `;
        const [rows] = await connection.query(sql, [id]);
        return rows[0] || null;
    },

    async findByWalletId(walletId, connection = pool) {
        const sql = `
            SELECT id, wallet_id, account_number, name,type, created_at
            FROM accounts
            WHERE wallet_id=?
        `;
        const [rows] = await connection.query(sql, [walletId]);
        return rows;
    },

    async findSystemAccounts(connection = pool) {
        const sql = `
            SELECT id, wallet_id ,account_number, name, type, created_at
            FROM accounts
            WHERE wallet_id IS NULL
        `;
        const [rows] = await connection.query(sql);
        return rows;
    }

};

export default accountRepository;