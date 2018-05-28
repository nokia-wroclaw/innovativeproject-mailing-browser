//sockety
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);

let io;
let clients = []; 

const emit = (event,data) => {
    try {
        clients.forEach(socket => socket.emit(event, data));
      } catch (error) {
        console.error(`Error: ${error.code}`);
      }
  }

  const initialize = (server) =>{
    io = socketIo(server);
    console.log("into initialize")
    io.on("connection", socket => {
        console.log("New client connected")
        clients.push(socket);
        socket.on("disconnect", () => {
            console.log("Client disconnected");
            clients.pop;
          });
      });
  }


  module.exports = {
    initialize,
    emit
  }