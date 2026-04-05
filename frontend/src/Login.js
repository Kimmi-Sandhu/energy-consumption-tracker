import React from "react";
import { useNavigate } from "react-router-dom";
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
        alert("Login successful");
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 style={{ color: "#0056b3", textAlign: "center" }}>Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
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