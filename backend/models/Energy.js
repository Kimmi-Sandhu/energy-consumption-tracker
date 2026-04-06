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
    required: true,
    default: "kWh",
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Energy", energySchema);