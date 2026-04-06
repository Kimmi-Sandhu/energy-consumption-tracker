import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>{
      <div className= "Navbar">
        <h2 className="logo">Energy Consumption Tracker</h2>
        
        <div className="nav-links">
          <a href="/register">Register</a>
          <a href="/">Login</a>
          <a href="/forgot">Forgot Password</a>
          <a href="/dashboard">Dashboard</a>
        </div>
      </div>}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;