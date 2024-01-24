const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const todosPath = path.resolve(__dirname, "../db/todos.json");
const historyPath = path.resolve(__dirname, "../db/history.json");

const historyActionMap = {
  add: "ADD",
  edit: "EDIT",
  delete: "DELETE",
  move: "MOVE",
};

const todosControllers = {
  handleGetAllTodo: (req, res) => {
    const { todos } = JSON.parse(
      fs.readFileSync(todosPath, { encoding: "utf8" })
    );
    if (!todos) {
      res.status(404);
    }
    res.status(200).json(todos);
  },
  handleCreateTodo: (req, res) => {
    const { columnId, title, description, author } = req.body;

    const { todos } = JSON.parse(
      fs.readFileSync(todosPath, { encoding: "utf8" })
    );
    const columnIndex = todos.findIndex((column) => column.id === columnId);
    if (columnIndex === -1) {
      res.status(404).json(`No column ${columnId}`);
    }
    const { history } = JSON.parse(
      fs.readFileSync(historyPath, { encoding: "utf8" })
    );
    const newHistory = {
      id: uuidv4(),
      cardTitle: title,
      previousColumn: null,
      currentColumn: todos[columnIndex].columnName,
      createdAt: new Date().getTime(),
      action: historyActionMap["add"],
    };
    const newTodo = {
      id: uuidv4(),
      title,
      description,
      author,
    };
    history.push(newHistory);
    todos[columnIndex].cards.push(newTodo);
    fs.writeFileSync(todosPath, JSON.stringify({ todos }));
    fs.writeFileSync(historyPath, JSON.stringify({ history }));
    res.status(201);
  },
  handleEditTodo: (req, res) => {
    const { columnId, cardId } = req.params;
    const { title, description, author } = req.body;

    const { todos } = JSON.parse(
      fs.readFileSync(todosPath, { encoding: "utf8" })
    );
    const columnIndex = todos.findIndex((column) => column.id === columnId);
    if (columnIndex === -1) {
      res.status(404).json(`No column ${columnId}`);
    }

    const cardIndex = todos[columnIndex].cards.findIndex(
      (card) => card.id === cardId
    );
    if (cardIndex === -1) {
      res.status(404).json(`No card ${cardId}`);
    }
    const { history } = JSON.parse(
      fs.readFileSync(historyPath, { encoding: "utf8" })
    );
    const newHistory = {
      id: uuidv4(),
      cardTitle: title,
      previousColumn: null,
      currentColumn: todos[columnIndex].columnName,
      createdAt: new Date().getTime(),
      action: historyActionMap["edit"],
    };
    history.push(newHistory);

    todos[columnIndex].cards[cardIndex] = {
      id: cardId,
      title,
      description,
      author,
    };
    fs.writeFileSync(todosPath, JSON.stringify({ todos }));
    fs.writeFileSync(historyPath, JSON.stringify({ history }));
    res.status(204);
  },
  handleMoveTodo: (req, res) => {
    const { columnId, cardId } = req.params;
    const { currentColumnId } = req.body;

    const { todos } = JSON.parse(
      fs.readFileSync(todosPath, { encoding: "utf8" })
    );
    const columnIndex = todos.findIndex((column) => column.id === columnId);
    const currentColumnIndex = todos.findIndex(
      (column) => column.id === currentColumnId
    );
    if (columnIndex === -1) {
      res.status(404).json(`No column ${columnId}`);
    }
    const cardIndex = todos[columnIndex].cards.findIndex(
      (card) => card.id === cardId
    );
    if (cardIndex === -1) {
      res.status(404).json(`No card ${cardId}`);
    }

    const { history } = JSON.parse(
      fs.readFileSync(historyPath, { encoding: "utf8" })
    );
    const newHistory = {
      id: uuidv4(),
      cardTitle: todos[columnIndex].cards[cardIndex].title,
      previousColumn: todos[columnIndex].columnName,
      currentColumn: todos[currentColumnIndex].columnName,
      createdAt: new Date().getTime(),
      action: historyActionMap["move"],
    };
    history.push(newHistory);

    const newCard = todos[columnIndex].cards[cardIndex];
    todos[currentColumnIndex].cards.push(newCard);
    todos[columnIndex].cards.splice(cardIndex, 1);

    fs.writeFileSync(todosPath, JSON.stringify({ todos }));
    fs.writeFileSync(historyPath, JSON.stringify({ history }));
    res.status(204);
  },
  handleDeleteTodo: (req, res) => {
    const { columnId, cardId } = req.params;

    const { todos } = JSON.parse(
      fs.readFileSync(todosPath, { encoding: "utf8" })
    );
    const columnIndex = todos.findIndex((column) => column.id === columnId);
    if (columnIndex === -1) {
      res.status(404).json(`No column ${columnId}`);
    }

    const cardIndex = todos[columnIndex].cards.findIndex(
      (card) => card.id === cardId
    );
    if (cardIndex === -1) {
      res.status(404).json(`No card ${cardId}`);
    }

    const { history } = JSON.parse(
      fs.readFileSync(historyPath, { encoding: "utf8" })
    );
    const newHistory = {
      id: uuidv4(),
      cardTitle: todos[columnIndex].cards[cardIndex].title,
      previousColumn: null,
      currentColumn: null,
      createdAt: new Date().getTime(),
      action: historyActionMap["delete"],
    };
    history.push(newHistory);

    todos[columnIndex].cards.splice(cardIndex, 1);
    fs.writeFileSync(todosPath, JSON.stringify({ todos }));
    fs.writeFileSync(historyPath, JSON.stringify({ history }));
    res.status(204);
  },
};

module.exports = todosControllers;
