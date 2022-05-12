const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const router = require('./router')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
    allowEIO3: true,
  },
  transport: ['websocket'],
})

io.on('connection', (socket) => {
  console.log('We Have a new connection!!!')

  socket.on('join', ({ name, room }, callback) => {
    console.log(`User ${name} has joined Room ${room}`)
  })

  socket.on('disconnect', () => {
    console.log('User has disconnected!!!')
  })
})

app.use(router)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
