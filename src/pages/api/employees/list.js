import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    const result = await pool.query('SELECT * FROM test.tbl_employees ORDER BY id')
    res.status(201).json({list : result.rows})
    // res.status(201).json({ message: "Hello World!" })
}