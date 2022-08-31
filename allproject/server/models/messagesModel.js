const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
  {
    from_userId: {
      type: String,
    },
    to_userId: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const model = mongoose.model('Message', messageSchema)

module.exports = model
