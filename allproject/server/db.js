const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: './.env' })

const db = async () => {
  const URI = process.env.URI
  try {
    const conn = await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`db Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = db
