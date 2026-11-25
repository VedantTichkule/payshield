import pool from './db.js';
import accountRepository from '../repositories/account.repository.js';

const SYSTEM_ACCOUNTS = [
    {
        accountNumber: 'PLATFORM_CASH_ASSET',
        name: 'Platform Cash Reserve',
        type: 'Asset',
        walletId: null
    },
    {
        accountNumber: 'PLATFORM_FEE_REVENUE',
        name: 'Platform fee Revenue',
        type: 'Revenue',
        walletId: null
    }
];

async function seedDatabase() {
    console.log("starting database seeding...");
    try {
        for (const account of SYSTEM_ACCOUNTS) {
            const existingAccount = await accountRepository.findByAccountNumber(account.accountNumber);
            if (existingAccount) {
                console.log(`Account '${account.accountNumber}' already exists (Id: ${existingAccount.id}). Skipping.`);
            } else {

                const newAccount = await accountRepository.create(account);
                console.log(`Created system account '${newAccount.accountNumber}' (ID:${newAccount.id}, Type:${newAccount.type}).`);
            }
        }
        console.log("seeding completed successfully");
        process.exit(0);
    } catch (error) {
        console.error("seeding failed:", error.message);
        process.exit(1);
    }
}
seedDatabase();