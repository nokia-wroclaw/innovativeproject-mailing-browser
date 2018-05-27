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


io.on("connection", socket => {
    console.log("dd");
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});


const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "http://localhost:3000/api/threads"
    );
    console.log("res: "+res.data[0].Subject);
    console.log("res: "+res);
    socket.emit("yourEvent", res.data);
  } catch (error) {
    console.error(`Error: ${error.code}`);
    console.log("res:" + res);
  }
};
server.listen(port, () => console.log(`Listening on port ${port}`));