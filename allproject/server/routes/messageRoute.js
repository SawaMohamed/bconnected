const express = require('express')
const {
  sendMessage,
  getMessages,
} = require('../controllres/messageControllers')

const router = express.Router()

router.get('/', getMessages)
router.post('/', sendMessage)

module.exports = router
