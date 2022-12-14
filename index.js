const express = require('express');
// const morgan = require("morgan");
// const logger = require("morgan");
const socket = require('socket.io')
require("dotenv").config();

const port = process.env.PORT || 3600
const app = express();
const server = app.listen(3400, ()=>{
    console.log(`App is running on port http://localhost:${port}`);
});
// app.use(logger("dev"));
// app.use(morgan("dev"));
app.use(express.static("public")) ;

const io = socket(server);
 
io.on('connection', (socket)=>{
    console.log('made socket connection', socket.id);
    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data);
    });
    
    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data)
    });

});