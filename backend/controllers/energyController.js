const Energy = require("../models/Energy");

// ADD ENERGY
exports.addEnergy = async (req, res) => {
  try {
    const { applianceName, usage, unit, date } = req.body;

    const energy = await Energy.create({
      applianceName,
      usage,
      unit,
      date,
     user: req.user?.id || "123"
    });

    res.status(201).json(energy);
  } catch (error) {
    res.status(500).json({ message: "Error adding energy" });
  }
};

// UPDATE ENERGY
exports.updateEnergy = async (req, res) => {
  try {
    const energy = await Energy.findById(req.params.id);

    if (!energy) {
      return res.status(404).json({ message: "Energy not found" });
    }

    energy.applianceName = req.body.applianceName || energy.applianceName;
    energy.usage = req.body.usage || energy.usage;
    energy.unit = req.body.unit || energy.unit;
    energy.date = req.body.date || energy.date;

    const updated = await energy.save();

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating energy" });
  }
};

// GET ENERGY
exports.getEnergy = async (req, res) => {
  try {
    const energy = await Energy.find({ user: req.user.id });
    res.status(200).json(energy);
  } catch (error) {
    res.status(500).json({ message: "Error fetching energy" });
  }
};

// DELETE ENERGY
exports.deleteEnergy = async (req, res) => {
  try {
    const energy = await Energy.findById(req.params.id);

    if (!energy) {
      return res.status(404).json({ message: "Energy not found" });
    }

    await energy.deleteOne();

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting energy" });
  }
};