const express = require('express')
const {getMatches} = require('../controllres/matchesController')

const router = express.Router()

router.get('/', getMatches)

module.exports = router
