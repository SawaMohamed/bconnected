const mongoose = require('mongoose')

const db = async () => {
    try {
      const conn = await mongoose.connect('mongodb+srv://iebm:test@cluster0.2l8lh62.mongodb.net/?retryWrites=true&w=majority', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
  
      console.log(`db Connected: ${conn.connection.host}`)
    } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
    }
  }


 module.exports = db;