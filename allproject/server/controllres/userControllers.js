const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const generateToken = (data, secret) => {
  return jwt.sign({ data }, secret, {
    expiresIn: '30d',
  })
}

// @desc      check authorization to log in
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && password) {
    const token = generateToken(user, email)
    res.status(201).json({ token, userId: user.user_id })
  }

  res.status(400).json('Invalid Credentials')
})

// @desc    register new user and store token & userId as cookies
const creatUser = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password, isAdmin } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(409).send('User already exists. Please login')
  }
  const generatedUserId = uuidv4()
  await User.create({
    user_id: generatedUserId,
    first_name,
    last_name,
    email,
    password,
    isAdmin,
  })
  const sanitizedEmail = email.toLowerCase()
  const data = {
    user_id: generatedUserId,
    email: sanitizedEmail,
    password,
  }
  res.status(201).json({
    userId: generatedUserId,
    token: generateToken(data, sanitizedEmail),
  })
})

// @desc    get all users no filtering
const getAllusers = asyncHandler(async (req, res) => {
  const allUsers = await User.find()
  res.json(allUsers)
})

// @desc    get the current user according to userId from cookies
const getSingleUser = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const singleUser = await User.findOne({ user_id: userId })
  res.json(singleUser)
})

// @desc  update user from onboarding
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const user = await User.findOne({ user_id: userId })
  const {
    dob,
    show_dob,
    gender_identity,
    show_gender,
    url,
    about,
    profession,
    interest,
    link_linkedin,
    link_portfolio,
    link_github,
    matches,
    favUsers
  } = req.body.formData
 console.log(favUsers)
  if (user) {
    user.dob = dob
    user.show_dob = show_dob
    user.show_gender = show_gender
    user.gender_identity = gender_identity
    user.url = url
    user.about = about
    user.profession = profession
    user.interest = interest
    user.link_linkedin = link_linkedin
    user.link_portfolio = link_portfolio
    user.link_github = link_github
    user.matches = matches
    user.favUsers = favUsers
  }
  const updatedUser = await user.save()
  res.status(200).json(updatedUser)
})

// @desc      update user matches with selected userId
const updateMatches = asyncHandler(async (req, res) => {
  const { userId, matchedUserId } = req.body

  const query = { user_id: userId }
  const updateDocument = {
    $push: { matches: { user_id: matchedUserId } },
  }
  const user = await User.updateOne(query, updateDocument)
  res.status(200).send(user)
})

// @desc  delete user from onboarding
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const deletedUser = await User.findByIdAndDelete(userId)
  res.json(deletedUser)
})

// I test it in tonder and I will change post requst in usersRouter.js to it
module.exports = {
  creatUser,
  getAllusers,
  updateUser,
  getSingleUser,
  deleteUser,
  login,
  updateMatches,
}
