import app from './src/app.js';
import { testConnection } from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;
async function startServer() {
    try {
        await testConnection();
        app.listen(PORT, () => {
            console.log(`Payshield server is running on port ${PORT}`);
            console.log(`Health check:http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('server startup is aborted due to DB connection failure');
        process.exit(1);
    }
}

startServer();