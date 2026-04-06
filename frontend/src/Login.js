import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";

const API_URL = "http://localhost:5000/api/auth/login";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="login-container">
      <h2 style={{ color: "#003366", textAlign: "center" }}>
        Energy Consumption Tracker
      </h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          required
        />

        <button type="submit">Login</button>
      </form>

      {/* 🔑 Forgot Password Link */}
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        <Link to="/forgot">Forgot Password?</Link>
      </p>

      {/* 🆕 Register Link */}
      <p style={{ textAlign: "center" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;