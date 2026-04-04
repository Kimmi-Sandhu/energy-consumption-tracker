import React from "react";
import "./App.css";

function Login() {
  return (
    <div className="login-container">
      <h2 style={{ color: "#0056b3", textAlign: "center" }}>Login</h2>

      <form className="login-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <a href="/register">Register</a>
      </p>

      <p>
        <a href="/forgot">Forgot Password?</a>
      </p>
    </div>
  );
}

export default Login;