const path = require('path');
const authController = require('../controllers/auth');
const express = require('express');



const router = express.Router();

// /admin/add-product => GET
router.get('/login', authController.getLogin);

module.exports = router;