// const path = require('path')
const express = require('express')
const db = require('./db')
const userRouter = require('./routes/usersRouter')
const matchesRouter = require('./routes/matchesRouter')
const loginRoutes = require('./routes/loginRoutes')
const messageRouter = require('./routes/messageRoute')
// const uploadRoutes = require('./routes/uploadRoutes')
const cors = require('cors')

const app = express()
app.use(cors())
db()
// here I use midleware to read eevryting from the browser then put it in Body Object
app.use(express.json())

app.use('/users', userRouter)
app.use('/matches', matchesRouter)
app.use('/login', loginRoutes)
app.use('/messages', messageRouter)

app.listen(8000, () => {
  console.log('Listing on port 8000')
})
