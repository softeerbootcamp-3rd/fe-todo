import Column from "./src/components/columns.js";
import { columns } from "./src/constants/columnData.js";

// Column 생성 함수
function createColumn(col) {
  const app = document.getElementById("app");
  const columnElement = Column(col);

  app.appendChild(columnElement);
}

// Column 동적 생성 함수
function spreadColumn() {
  for (let column of columns) {
    createColumn(column);
  }
}

spreadColumn();
