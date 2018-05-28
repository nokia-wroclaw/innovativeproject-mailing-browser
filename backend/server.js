const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

let clients = []; 
let path = "http://localhost:3000/api/threads";

io.on("connection", socket => {
  console.log("New client connected")
  clients.push(socket);
  emit("event");

  socket.on("disconnect", () => {
      console.log("Client disconnected");
      clients.pop;
    });
});

 const emit = async event => {
    try {
        const res = await axios.get("http://localhost:3000/api/threads");
        clients.forEach(socket => socket.emit(event, res.data));
      } catch (error) {
        console.error(`Error: ${error.code}`);
      }
  }
  
server.listen(port, () => console.log(`Listening on port ${port}`));