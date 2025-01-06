import mysql from "mysql2/promise";
import os from "os";
import dotenv from "dotenv";

dotenv.config();

// export const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     port: process.env.DB_PORT,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     connectionLimit: os.cpus().length + 2
// });

export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    port: 3306,
    database: "db_final_project",
    password: "rafi",
    connectionLimit: os.cpus().length + 2
});