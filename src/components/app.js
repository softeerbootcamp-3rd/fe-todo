import * as Header from "./header/index.js";
import * as ColumnContainer from "./column-container/index.js";
import * as ActionHistoryListDialog from "./action-history-list/index.js";
import * as Alert from "./alert/index.js";

const app = document.getElementById("app");

export function initializeApp() {
  initializeColumnData();
  Header.render(app);
  ColumnContainer.render(app);
  ActionHistoryListDialog.render(app);
  Alert.render(app);
}

function initializeColumnData() {
  if (localStorage.getItem("todolist")) {
    return;
  }
  localStorage.setItem("todolist", JSON.stringify(initialColumnData));
}

const initialColumnData = [
  { id: 1, columnName: "해야할 일", cards: [] },
  { id: 2, columnName: "하고 있는 일", cards: [] },
  { id: 3, columnName: "완료한 일", cards: [] },
];
