import express from 'express';
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url';
import { Server } from 'socket.io'
const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName);
const app = express();
const server = http.createServer(app);
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})
io.on('connection', (socket) => {
  io.emit("chat message", "user connected")
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

server.listen(8080, () => {
  console.log("Listening on port 8080")
})

// TODO
// Broadcast a message to connected users when someone connects or disconnects.
// Add support for nicknames.
// Don’t send the same message to the user that sent it. Instead, append the message directly as soon as they press enter.
// Add “{user} is typing” functionality.
// Show who’s online.
// Add private messaging.
// Share your improvements!