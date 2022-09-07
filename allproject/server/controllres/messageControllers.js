const asyncHandler = require('express-async-handler')
const Message = require('../models/messagesModel')

const sendMessage = asyncHandler(async (req, res) => {
  const message = req.body.message

  const insertedMessage = await Message.create(message)
  res.send(insertedMessage)
})

const getMessages = asyncHandler(async (req, res) => {
  const { userId, correspondingUserId } = req.query
  const query = {
    from_userId: userId,
    to_userId: correspondingUserId,
  }

  const foundMessages = await Message.find(query)
  res.send(foundMessages)
})

module.exports = { sendMessage, getMessages }
