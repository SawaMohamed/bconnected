const express = require('express');
const { interestUsers} = require('../controllres/interestUsersController');
const router = express.Router()

// here to avoid to put them in one file 
router.get('/',interestUsers);

module.exports = router