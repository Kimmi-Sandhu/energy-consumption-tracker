const express = require('express');
const router = express.Router();

const {
  getAllEnergyData,
  createEnergyData,
  updateEnergyData,
  deleteEnergyData
} = require('../controllers/energyController');

router.get('/', getAllEnergyData);
router.post('/', createEnergyData);
router.put('/:id', updateEnergyData);
router.delete('/:id', deleteEnergyData);

module.exports = router;