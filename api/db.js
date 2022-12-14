import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config()

// create connection to the database
export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
});