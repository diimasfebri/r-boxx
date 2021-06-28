'use strict'
const http = require('http')

const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const socketIO = require('socket.io')
const SerialPort = require('serialport')

const { StringStream } = require('scramjet')
const { verifyToken } = require('./plugins/tokens')

//inisialisasi router
const users = require ('./routes/users')
const members = require ('./routes/members')

// Create the express app
const app = express()


//Panggil Database
mongoose.connect(process.env.MONGO_DATABASE || 'mongodb://localhost:27017/r-boxx', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).connection


//middleware
app
  .use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
  }))
  .use(cookieParser())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    try {
      const bearerHeader = req.headers['authorization']
      if (typeof bearerHeader === 'string') {
        const token = bearerHeader.split(' ')[1]
        const { sub, role, username } = verifyToken(token)
        if (!sub || !role || !username) throw new Error('UNAUTHORIZED')
        req.user = {
          _id: sub,
          role,
          username
        }
        req.token = token
        next()
      } else {
        req.user = null
        next()
      }
    } catch (e) {
      req.user = null
      next()
    }
  })



// Routes and middleware
// app.use(/* ... */)


// Error handlers
app.use(function fourOhFourHandler (req, res) {
  res.status(404).send()
})
app.use(function fiveHundredHandler (err, req, res, next) {
  console.error(err)
  res.status(500).send()
})

const server = http.createServer(app)
const io = socketIO(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
})

//panggil router  
app
.use('/users', users)
.use('/members', members)

app.set('weighNSP', weighNSP)

// Start server
function start() {
  server.listen(8000)
  console.log('Started at http://localhost:8000')
}
start()
