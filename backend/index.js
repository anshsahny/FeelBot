const http = require('http')
const express = require('express')
const socket = require('socket.io')
var cors = require('cors')
const path = require('path')

/* Socket */

const app = express()
const apiPort = 8000

app.use(cors());
app.use(express.json({ limit: '10kb' }));

const server = http.createServer(app);
const io = socket(server);

users = [];
ids = [];
connections = [];

io.on("connection", socket => {
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length)

    socket.emit("your id", socket.id)
    ids.push(socket.id)

    socket.on("new user", body => {
        socket.username = body.Username
        users.push(socket.username)
        updateUsernames()
    })

    socket.on("disconnect", body => {
        users.splice(users.indexOf(socket.username), 1)
        updateUsernames()
        connections.splice(connections.indexOf(socket), 1)
        console.log('Disconnected: %s sockets connected', connections.length)
    })

    let updateUsernames = async () => {
        io.sockets.emit('get users', users)
    }
})

server.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))