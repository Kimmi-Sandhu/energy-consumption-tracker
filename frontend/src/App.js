import React, { useEffect, useState } from "react";
import API from "./axiosConfig";

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    applianceName: "",
    usage: "",
    unit: "kWh",
    date: "",
  });
const[editId,setEditId]=useState(null);

  const fetchEntries = async () => {
    try {
      const res = await API.get("/energy");
      setEntries(res.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.post("/energy", {
          applianceName: form.applianceName,
          usage: Number(form.usage),
          unit: form.unit,
          date: form.date,
        });
        alert("Data updated successfully");
        setEditId(null);
      } else {
        await API.post("/energy/", {
          applianceName: form.applianceName,
          usage: Number(form.usage),
          unit: form.unit,
          date: form.date,
        });
        alert("Data saved successfully");
      }

      setForm({
        applianceName: "",
        usage: "",
        unit: "kWh",
        date: "",
      });

      fetchEntries();
    } catch (error) {
      console.log("Error saving data:", error);
      alert("Failed to save data");
    }
  };
  const deleteEntry = async (id) => {
  try {
    await API.delete(`/energy/${id}`);
    fetchEntries();
  } catch (error) {
    console.log("Delete error:", error);
  }
};

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Energy Consumption Tracker</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="applianceName"
            placeholder="Appliance Name"
            value={form.applianceName}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            name="usage"
            placeholder="Usage"
            value={form.usage}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="unit"
            placeholder="Unit"
            value={form.unit}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Entry</button>
      </form>

      <h2>Saved Entries</h2>

      {entries.length === 0 ? (
        <p>No entries found</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
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
                <td>{item.date}</td>
                <td>
                  <button onClick={() => deleteEntry(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;