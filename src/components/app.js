import * as Header from "./header/index.js";
import * as ColumnContainer from "./column-container/index.js";
import * as ActionHistoryListDialog from "./action-history-list/index.js";
import * as Alert from "./alert/index.js";
import { getLocalStorage, setLocalStorage } from "../utils/local-storage.js";
import todoStore from "../store/todoStore.js";

const app = document.getElementById("app");

export function initializeApp() {
  initializeColumnData();
  Header.render(app);
  ColumnContainer.render(app);
  ActionHistoryListDialog.render(app);
  Alert.render(app);
}

function initializeColumnData() {
  if (!getLocalStorage("todolist")) {
    setLocalStorage("todolist", initialColumnData);
  }

  const todolist = getLocalStorage("todolist");
  for (let i = 0; i < todolist.length; i++) {
    todoStore.subscribe("ADD_TODO" + todolist[i].id, () => {
      ColumnContainer.renderColumn(todolist[i].id);
    });
    todoStore.subscribe("DELETE_TODO" + todolist[i].id, () => {
      ColumnContainer.renderColumn(todolist[i].id);
    });
    todoStore.subscribe("EDIT_TODO" + todolist[i].id, () => {
      ColumnContainer.renderColumn(todolist[i].id);
    });
  }

  todoStore.setState(todolist);
}

const initialColumnData = [
  { id: 1, columnName: "해야할 일", cards: [] },
  { id: 2, columnName: "하고 있는 일", cards: [] },
  { id: 3, columnName: "완료한 일", cards: [] },
];
