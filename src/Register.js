// Register.js
import React, { useState } from "react";
import "./Login.css"; // You can reuse the styling or create a new one
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = () => {
    fetch("http://localhost:3001/api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Registration successful!");
          return response.json();
        } else {
          throw new Error("Registration failed");
        }
      })
      .then((data) => {
        console.log("Data after successful registration:", data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        setError("Registration failed. Please try again.");
      });
  };

  return (
    <div className="login-container">
      <h1>Register for EaseList</h1>
      <form id="registerForm">
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

        <button type="button" onClick={register}>
          Register
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Register;
