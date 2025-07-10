'use client';

import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post('/api/users/login', { username, password });
            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <>
            <h1 className="text-xl mb-4">Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-2 p-2 border"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-2 p-2 border"
                required
            />
            <button type="button" onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            {message && <p className="mt-2 text-red-500">{message}</p>}

        </>
    );
}
