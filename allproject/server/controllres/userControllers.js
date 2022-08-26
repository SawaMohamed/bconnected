const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const generateToken = (data, secret) => {
  return jwt.sign({ data }, secret, {
    expiresIn: '30d',
  })
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && password) {
      const token = generateToken(user, email)
      console.log(token)
      res.status(201).json({ token, userId: user._id })
    }

    res.status(400).json('Invalid Credentials')
  } catch (error) {
    console.error(error.message)
  }
}

const creatUser = async (req, res) => {
  // here I must use midleware because when I send json it ll not auto in express, so I use midleware to read the
  // body to got the information that I need /I ll add in it server.js file
  const { first_name, last_name, email, password, isAdmin, photo, about } =
    req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(409).send('User already exists. Please login')
  }

  // The new user that I want to store
  const user = await User.create({
    first_name,
    last_name,
    email,
    password,
    isAdmin,
    photo,
    about,
  })
  // The I return it to the Client to knew that his user has already stored

  const sanitizedEmail = email.toLowerCase()

  const data = {
    user_id: user._id,
    email: sanitizedEmail,
    password,
  }
  res.status(201).json({
    userId: user._id,
    first_name,
    last_name,
    email,
    password,
    isAdmin,
    photo,
    about,
    token: generateToken(data, sanitizedEmail),
  })
}
// Here It should be a group of users not all together we can prass next the next for each group, but I ll do it After
const getAllusers = async (req, res) => {
  const allUsers = await User.find()
  res.json(allUsers)
}
const getSingleUser = async (req, res) => {
  const { userId } = req.params
  const singleUser = await User.findById(userId)
  res.json(singleUser)
}
const updateUser = async (req, res) => {
  const { userId } = req.params
  const { first_name, last_name, email, password, isAdmin, photo, about } =
    req.body
  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
      first_name,
      last_name,
      email,
      password,
      isAdmin,
      photo,
      about,
    },
    //findByIdAndUpdate method takes 3 things Id, Updating that I want to update and option => new = true
    //when the Client edit something he will got the last edit that he done
    { new: true }
  )
  res.json(updateUser)
}
const deleteUser = async (req, res) => {
  const { userId } = req.params
  const deletedUser = await User.findByIdAndDelete(userId)
  res.json(deletedUser)
}

// I test it in tonder and I will change post requst in usersRouter.js to it
module.exports = {
  creatUser,
  getAllusers,
  updateUser,
  getSingleUser,
  deleteUser,
  login,
}
