const express = require('express');
const router = express.Router();
const franchiseController = require('../controllers/franchiseController');

router.get('/', franchiseController.getAllFranchises);
router.get('/:id', franchiseController.getFranchiseById);

module.exports = router;