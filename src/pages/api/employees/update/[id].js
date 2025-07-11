import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    try {
        const { id, fname, lname, position } = req.body
        const result = await pool.query(
            'UPDATE test.tbl_employees SET lname = $1, fname = $2, position = $3 WHERE id = $4 RETURNING *',
            [lname, fname, position, id]
        )

        console.log(result)

        if (result.rows[0]) {
            res.status(201).json({ success: true })
            return
        }

        res.status(201).json({ success: false })
        
    } catch (error) {
        res.json({ error: error.message })
    }
}