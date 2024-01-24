const express = require("express");
const cors = require("cors");
const todosApi = require("./routes/todos");
const historyApi = require("./routes/history");

const server = express();
const port = 8000;

server.use(cors());
server.use(express.json());

server.use("/todos", todosApi);
server.use("/history", historyApi);

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
