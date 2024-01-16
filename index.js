import Card from "./src/components/cards.js";
import Column from "./src/components/columns.js";
import { columns } from "./src/constants/columnData.js";

function createCard(id) {
  const column = document.getElementById(id);

  const card = Card();
  column.appendChild(card);
}

function createColumn(col) {
  const app = document.getElementById("app");
  const columnElement = Column(col);

  app.appendChild(columnElement);
}

function spreadColumn() {
  for (let column of columns) {
    createColumn(column);
  }
}

spreadColumn();
createCard("todo");
