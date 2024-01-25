const express = require("express");
const bodyParser = require("body-parser");
const {
  getTodoList,
  addTodoListItem,
  editTodoListItem,
  removeTodoListItem,
  moveTodoListItem,
} = require("./controllers/todo");
const { clearHistory, getHistory } = require("./controllers/history");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, PUT, DELETE, PATCH"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  res.send(getTodoList()).end();
});

app.post("/todos/:listName", (req, res) => {
  const newItem = addTodoListItem(req.params.listName, req.body);
  res.status(201).send(newItem).end();
});

app.patch("/todos/:listName/:id", (req, res) => {
  const newItem = editTodoListItem(req.params.listName, req.body);
  res.status(200).send(newItem).end();
});

app.delete("/todos/:listName/:id", (req, res) => {
  removeTodoListItem(req.params.listName, parseInt(req.params.id));
  res.status(200).end();
});

app.put("/todos/:listName/:id", (req, res) => {
  moveTodoListItem(
    req.params.listName,
    parseInt(req.params.id),
    req.query.titleDst,
    parseInt(req.query.idDst),
    req.query.position
  );
  res.status(200).end();
});

app.get("/history", (req, res) => {
  res.status(200).send(getHistory());
});
app.delete("/history", (req, res) => {
  clearHistory();
  res.status(200).end();
});

app.listen(3333, () => {
  console.log("mock server running on http://localhost:3333");
});
