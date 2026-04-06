const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllEnergy,
  createEnergy,
  updateEnergy,
  deleteEnergy,
} = require("../controllers/energyController");

router.get("/", authMiddleware, getAllEnergy);
router.post("/", authMiddleware, createEnergy);
router.put("/:id", authMiddleware, updateEnergy);
router.delete("/:id", authMiddleware, deleteEnergy);

module.exports = router;