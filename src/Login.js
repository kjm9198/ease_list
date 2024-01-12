import React from 'react';
import './Login.css';

function Login() {
    const login = () => {
        // Add logic for login functionality
        console.log('Logging in...');
    };

    return (
        <div className="login-container">
            <h1>Welcome to EaseList</h1>
            <form id="loginForm">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />

                <button type="button" onClick={login}>Login</button>
            </form>
        </div>
    );
}

export default Login;
