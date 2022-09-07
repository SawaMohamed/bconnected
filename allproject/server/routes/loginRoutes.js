const express = require('express');
const { login} = require('../controllres/userControllers');
const router = express.Router()

// here to avoid to put them in one file 
router.post('/',login);

module.exports = router