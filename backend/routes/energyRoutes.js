const express = require("express");
const router = express.Router();

const {
  getAllEnergy,
  createEnergy,
  updateEnergy,
  deleteEnergy,
} = require("../controllers/energyController");

router.get("/", getAllEnergy);
router.post("/", createEnergy);
router.put("/:id", updateEnergy);
router.delete("/:id", deleteEnergy);

module.exports = router;