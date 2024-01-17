import Column from "./src/components/columns.js";
import { columns } from "./src/constants/columnData.js";

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
// createCard("todo");
