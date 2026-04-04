const mongoose = require("mongoose");

const energySchema = new mongoose.Schema({
  applianceName: {
    type: String,
    required: true,
  },
  usage: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    default: "kWh",
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Energy", energySchema);