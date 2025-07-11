import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    try {
        const { id } = req.query
        const result = await pool.query('SELECT * FROM test.tbl_employees WHERE id = $1', [id])

        res.status(201).json({ employee: result.rows[0] })
        
    } catch (error) {
        res.json({ error: error.message })
    }
}