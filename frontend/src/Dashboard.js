import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function Dashboard() {
  const navigate = useNavigate();

  const [applianceName, setApplianceName] = useState("");
  const [usage, setUsage] = useState("");
  const [unit, setUnit] = useState("kWh");
  const [date, setDate] = useState("");
  const [entries, setEntries] = useState([]);
  const [editId, setEditId] = useState(null);

   const API_URL = "http://localhost:5000/api/energy";

   const authHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const fetchEntries = async () => {
    try {
      const response = await axios.get(API_URL, authHeader);
      setEntries(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      applianceName,
      usage: Number(usage),
      unit,
      date,
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post(API_URL, formData);
      }

      setApplianceName("");
      setUsage("");
      setUnit("kWh");
      setDate("");
      fetchEntries();
    } catch (error) {
      console.log("Error saving data:", error);
    }
  };

  const handleEdit = (item) => {
    setApplianceName(item.applianceName || "");
    setUsage(item.usage || "");
    setUnit(item.unit || "kWh");
    setDate(item.date ? item.date.split("T")[0] : "");
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, authHeader);
      fetchEntries();
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  return (
  <div className="container">
    <h1 style={{ color: "#0056b3", textAlign: "center" }}>
      Energy Consumption Tracker
    </h1>

  
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Appliance Name"
        value={applianceName}
        onChange={(e) => setApplianceName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Usage"
        value={usage}
        onChange={(e) => setUsage(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Unit (kWh)"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button type="submit">
        {editId ? "Update Entry" : "Add Entry"}
      </button>
    </form>

    <h2>Saved Entries</h2>

    <table>
      <thead>
        <tr>
          <th>Appliance Name</th>
          <th>Usage</th>
          <th>Unit</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {entries.map((item) => (
          <tr key={item._id}>
            <td>{item.applianceName}</td>
            <td>{item.usage}</td>
            <td>{item.unit}</td>
            <td>{item.date ? item.date.split("T")[0] : ""}</td>
            <td>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>

<div style={{ textAlign: "center", marginTop: "20px" }}>
  <button
    onClick={handleLogout}
    style={{
      backgroundColor: "#0056b3",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px"
    }}
  >
    Logout
  </button>
</div>
  </div>
);
}

export default Dashboard;