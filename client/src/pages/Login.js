
//Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../Images/icon6.png"; // Replace with your logo image

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleLogin = () => {
        // Perform sign-in logic and authentication here
        // Check if the email and password are valid
        // If valid, store a token or flag in local storage to indicate user authentication
        // If invalid, show an error message
    
        if (email === "sarasi@gmail.com" && password === "123") {
          // Successful sign-in
          navigate("/home");
        } else {
          // Invalid credentials
          setError("Invalid email or password");
        }
      };

      return (
        <div className="login-background">
        <div className="containerlogin">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="brand-name">Sarasi Book Shop</h1>
          </div>
          <div className="login-inputs">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <h5 >please use sarasi@gmail.com as email and 123 as password</h5>
            <button type="button" onClick={handleLogin} className="login-button">
              Login
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
  );
};

export default Login;
  