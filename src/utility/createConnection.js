import { pool } from "../app/database.js";

export const createConnection = async () => {
    return pool.getConnection();
};


