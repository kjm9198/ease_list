import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = () => {
    fetch("http://localhost:3001/api/login", {
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
          console.log("Login successful!");
          return response.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        console.log("Data after successful login:", data);
        navigate("/grocery-list");
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setError("Invalid username or password");
      });
  };

  // useEffect(() => {
  //   navigate("/grocery-list");
  // }, []
  //
  // );
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

        <button type="button" onClick={login}>
          Login
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
