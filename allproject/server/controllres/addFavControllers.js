const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc      update user matches with selected userId
const updateFav = asyncHandler(async (req, res) => {
  const { userId, userFavUpdate } = req.body

  const query = { user_id: userId }
  const updateDocument = {
    $push: { favUsers: { user_id: userFavUpdate } },
  }
  const user = await User.updateOne(query, updateDocument)
  res.status(200).json(user)
})

// @desc      get all your fav users
const getFav = asyncHandler(async (req, res) => {
  const favIds = JSON.parse(req.query.favIds)
  if (favIds) {
    const pipeline = [
      {
        $match: {
          user_id: {
            $in: favIds,
          },
        },
      },
    ]

    const foundUsers = await User.aggregate(pipeline)
    res.status(200).json(foundUsers)
  }
})

module.exports = {
  updateFav,
  getFav,
}
