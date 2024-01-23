import Column from "./src/components/columns.js";
import { createLogBoxTemplate } from "./src/components/templates.js";
import { columns } from "./src/constants/columnData.js";
import customEventHandler from "./src/utils/eventHandler.js";
import Store from "./src/components/Store.js";

// Column 생성 함수
function createColumn(col) {
  const listenerTypes = ["click", "input"];
  const app = document.getElementById("app");
  const columnElement = Column(col);

  for (let listenerType of listenerTypes) {
    columnElement.addEventListener(listenerType, (e) => {
      customEventHandler(e);
    });
  }

  app.appendChild(columnElement);
}

// Column 동적 생성 함수
function spreadColumn() {
  for (let column of columns) {
    createColumn(column);
  }
}

document.getElementById("logBox").addEventListener("click", () => {
  createLogBoxTemplate();
});

export const columnData = new Store();
spreadColumn();
