const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addEnergy,
  getEnergy,
  updateEnergy,
  deleteEnergy
} = require("../controllers/energyController");

router.get("/", authMiddleware, getEnergy);
router.post("/", authMiddleware, addEnergy);
router.put("/:id", authMiddleware, updateEnergy);
router.delete("/:id", authMiddleware, deleteEnergy);

module.exports = router;