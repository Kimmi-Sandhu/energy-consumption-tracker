import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";

const API_URL = "http://localhost:5000/api/auth/register";

function Register() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful");
        
        // Redirect to login page 
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering. Please try again.");
    }
  };

  return (
    <div className="login-container">
     <h2 style={{ color: "#0056b3", textAlign: "center" }}>Register</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
}

export default Register;