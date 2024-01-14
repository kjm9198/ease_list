import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = () => {
        // Placeholder for authentication logic
        // Replace this with your actual authentication logic

        // Example: Send login request to the server
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    // Login successful
                    console.log('Login successful!');
                    // Add logic for actions after successful login (e.g., redirect)
                } else {
                    // Login failed
                    setError('Invalid username or password');
                }
            })
            .catch((error) => {
                console.error('Error during login:', error);
            });
    };


    return (
        <div className="login-container">
            <h1>Welcome to EaseList</h1>
            <form id="loginForm">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="button" onClick={login}>Login</button>

                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
