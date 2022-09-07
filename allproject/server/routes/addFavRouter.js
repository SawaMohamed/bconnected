const express = require('express')
const { updateFav,getFav } = require('../controllres/addFavControllers')

const router = express.Router()

router.put('/', updateFav)
router.get('/', getFav)

module.exports = router
