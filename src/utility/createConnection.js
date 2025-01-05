import { pool } from "../app/database.js";

export const createConnection = async () => {
    return await pool.getConnection();
};