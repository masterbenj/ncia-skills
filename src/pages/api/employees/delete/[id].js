import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    try {
        const { id } = req.query
        const result = await pool.query('DELETE FROM test.tbl_employees WHERE id = $1', [id])

        if (result.rowCount === 0) {
            return res.status(201).json({ success: false })
        }

        return res.status(201).json({ success: true })
        
    } catch (error) {
        res.json({ error: error.message })
    }
}