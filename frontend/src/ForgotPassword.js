import React from "react";
import "./App.css";

function ForgotPassword() {
  return (
    <div className="login-container">
      <h2 style={{ color: "#0056b3", textAlign: "center" }}>Forgot Password</h2>

      <form className="login-form">
        <input type="email" placeholder="Enter your email" required />

        <button type="submit">Reset Password</button>
      </form>

      <p>
        Remember your password? <a href="/">Login</a>
      </p>
    </div>
  );
}

export default ForgotPassword;