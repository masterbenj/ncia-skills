import pool from '@/lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    const { username, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE username=$1', [username]);

    if (result.rows.length === 0) {
        res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username } });
}