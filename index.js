const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected successfully!"))
.catch(err => console.log("Error:", err));


app.get('/', (req, res) => {
  res.send("Energy Consumption Tracker running 🚀");
});

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 80;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
// update form feature branch //
// second update for PR //