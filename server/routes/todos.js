const express = require("express");
const todos = require("../controllers/todos");

const todosApi = express.Router();

todosApi.get("/", todos.handleGetAllTodo);
todosApi.post("/", todos.handleCreateTodo);
todosApi.put("/:columnId/:cardId", todos.handleEditTodo);
todosApi.patch("/:columnId/:cardId", todos.handleMoveTodo);
todosApi.delete("/:columnId/:cardId", todos.handleDeleteTodo);

module.exports = todosApi;
