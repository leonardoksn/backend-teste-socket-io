import express from 'express'
import http from 'http'
import cors from 'cors';
import { Server } from 'socket.io';
const app = express()
app.use(cors());

const server = http.createServer(app)
const io = new Server(server)

const SERVER_PORT = 8080;
const SERVER_HOST = 'localhost';

app.get('/' , (req,res) => {
    res.send('Apenas')
})

io.on('connection', (socket) => {
    console.log("[IO] Connection => Server has a new connection")
    socket.on('chat.message', data => {
        console.log('[SOCKET] Chat.message => ', data)
        io.emit('chat.message', data)
    })
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconected')
    })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listen => Server is running at http://${SERVER_HOST}:${SERVER_PORT}`)
    console.log(`[HTTP] Listen => Press CTRL+C to stop it`)
})