const Energy = require("../models/Energy");

const getAllEnergy = async (req, res) => {
  try {
   const entries = await Energy.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    console.error("Error fetching energy data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createEnergy = async (req, res) => {
  try {
    const { applianceName, usage, unit, date } = req.body;

    const newEntry = new Energy({
      applianceName,
      usage,
      unit,
      date,
      user: req.user.id,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    console.error("Error creating energy entry:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateEnergy = async (req, res) => {
  try {
    const { applianceName, usage, unit, date } = req.body;

    const updatedEntry = await Energy.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { applianceName, usage, unit, date },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json(updatedEntry);
  } catch (error) {
    console.error("Error updating energy entry:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteEnergy = async (req, res) => {
  try {
    const deletedEntry = await Energy.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting energy entry:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllEnergy, createEnergy, updateEnergy, deleteEnergy };