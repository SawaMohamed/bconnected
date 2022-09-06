const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const getMatches = asyncHandler(async (req, res) => {
  const userIds = JSON.parse(req.query.userIds)
  console.log(req.query.userIds)
  if (userIds) {
  const pipeline = [
    {
      $match: {
        user_id: {
          $in: userIds,
        },
      },
    },
  ]


  const foundUsers = await User.aggregate(pipeline)
  res.status(200).json(foundUsers)
  }
})



module.exports = { getMatches }
