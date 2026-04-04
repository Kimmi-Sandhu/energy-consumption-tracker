const Energy = require("../models/Energy");

const getAllEnergy = async (req, res) => {
  try {
    const data = await Energy.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEnergy = async (req, res) => {
  try {
    console.log("POST body:", req.body);

    const newData = new Energy({
      applianceName: req.body.applianceName,
      usage: Number(req.body.usage),
      unit: req.body.unit,
      date: req.body.date,
    });

    const savedData = await newData.save();
    console.log("Saved data:", savedData);

    res.status(201).json(savedData);
  } catch (error) {
    console.log("POST error:", error);
    res.status(400).json({ message: error.message });
  }
};

const updateEnergy = async (req, res) => {
  try {
    const updatedData = await Energy.findByIdAndUpdate(
      req.params.id,
      {
        applianceName: req.body.applianceName,
        usage: Number(req.body.usage),
        unit: req.body.unit,
        date: req.body.date,
      },
      { new: true }
    );

    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEnergy = async (req, res) => {
  try {
    await Energy.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEnergy,
  createEnergy,
  updateEnergy,
  deleteEnergy,
};