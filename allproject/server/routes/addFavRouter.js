const express = require('express')
const { updateMatches,getFav } = require('../controllres/addFavControllers')

const router = express.Router()

router.put('/', updateMatches)
router.get('/', getFav)

module.exports = router
