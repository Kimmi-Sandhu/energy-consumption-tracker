import React from "react";
import "./App.css";

function Register() {
  return (
    <div className="login-container">
     <h2 style={{ color: "#0056b3", textAlign: "center" }}>Register</h2>

      <form className="login-form">
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