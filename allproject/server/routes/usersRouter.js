const express = require('express')
const {
  creatUser,
  getAllusers,
  updateUser,
  getSingleUser,
  deleteUser,
} = require('../controllres/userControllers')
const router = express.Router()

router.get('/', getAllusers)
router.get('/:userId', getSingleUser)
// here to avoid to put them in one file
router.post('/', creatUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

module.exports = router
