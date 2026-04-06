import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const API_URL = "http://localhost:5000/api/auth/forgot-password";

function ForgotPassword() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message || "Request failed");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 style={{ color: "#0056b3", textAlign: "center" }}>Forgot Password</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="sandhukimmi9@gmail.com"
          required
        />
        <button type="submit">Reset Password</button>
      </form>

      <p style={{ textAlign: "center" }}>
        Remember your password? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;