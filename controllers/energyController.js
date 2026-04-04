const EnergyData = require('../models/EnergyData');

// Get all energy consumption data
const getAllEnergyData = async (req, res) => {
  try {
    const energyData = await EnergyData.find();
    res.status(200).json(energyData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new energy consumption data
const createEnergyData = async (req, res) => {
  try {
    const { applianceName, usage, unit, date } = req.body;

    const newEnergyData = new EnergyData({
      applianceName,
      usage,
      unit,
      date
    });

    const savedEnergyData = await newEnergyData.save();
    res.status(201).json(savedEnergyData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update energy consumption data
const updateEnergyData = async (req, res) => {
  try {
    const updatedEnergyData = await EnergyData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEnergyData) {
      return res.status(404).json({ message: 'Energy data not found' });
    }

    res.status(200).json(updatedEnergyData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete energy consumption data
const deleteEnergyData = async (req, res) => {
  try {
    const deletedEnergyData = await EnergyData.findByIdAndDelete(req.params.id);

    if (!deletedEnergyData) {
      return res.status(404).json({ message: 'Energy data not found' });
    }

    res.status(200).json({ message: 'Energy data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEnergyData,
  createEnergyData,
  updateEnergyData,
  deleteEnergyData
};