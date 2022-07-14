
const express  = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const {generateMessage, locationMessage} = require('./utils/msg')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))


//Socket connection
io.on('connection', (socket) => {
    console.log('new connection')
    //send a welcome message from the server to the client by using emit
   socket.emit('message', generateMessage('Welcome!'))

   //send a broadcast to indicate that the user has joined
   socket.broadcast.emit('message', generateMessage('A new user has joined'))

   socket.on('sendMessage', (message, callback)=> {
    //emits an event to all the connected clients
    io.emit('message',generateMessage(message))
    callback('✔')
   })

   socket.on('sendLocation', (location, callback)=>{
    io.emit('locationMessage', locationMessage(`https://google.com/maps?q=${location.latitude},${location.longitude}`))
    callback()
   })

   socket.on('disconnect', ()=> {
    io.emit('message', generateMessage('user has left'))
   })
})

const port = process.env.PORT || 3000

server.listen(port, ()=> {
    console.log(`server started on port ${port}`);
})