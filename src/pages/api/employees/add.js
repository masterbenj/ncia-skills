import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    try {
        const { lname, fname, position } = req.body

        console.log(req.body)

        const result = await pool.query(
            'INSERT INTO test.tbl_employees (lname, fname, position) VALUES ($1, $2, $3) RETURNING *',
            [lname, fname, position]
        )
        console.log(result)
        if (result.rows.length > 0) {
            res.status(201).json({ sucess: true })
            return
        }

        res.status(201).json({ sucess: false })
    } catch (error) {
        res.json({ error: error.message })
    }
}