const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/', projectController.index); // Access 'index' controller

module.exports = router;
