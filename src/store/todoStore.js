import { createStore } from "./store";
import {
  addTodoListItem,
  editTodoListItem,
  removeTodoListItem,
  moveTodoListItem,
} from "../utils/API/todoList";
import {
  addHistory,
  editHistory,
  removeHistory,
  moveHistory,
} from "../utils/API/history";

const initTodoList = {
  "해야할 일": [],
  "하고 있는 일": [],
  "완료한 일": [],
};

const todoList = localStorage.getItem("todoList");
const historyList = localStorage.getItem("history");
let resultTodoList;
let resultHistory;
if (!todoList) {
  resultTodoList = initTodoList;
  localStorage.setItem("todoList", JSON.stringify(resultTodoList));
} else {
  resultTodoList = JSON.parse(todoList);
}
if (!historyList) {
  resultHistory = [];
  localStorage.setItem("history", JSON.stringify(resultHistory));
} else {
  resultHistory = JSON.parse(historyList);
}

let inStoreData = { todoList: resultTodoList, history: resultHistory };
const store = createStore(inStoreData, reducer);

// reducer함수 => 여기선 state를 변경 + API서버로의 변경까지 진행
function reducer(state = {}, action) {
  //값을 받아서 state에 추가
  if (action.type === "plusTodoItem") {
    const item = action.payload.item;
    const todoColTitle = action.payload.todoColTitle;
    store.setPlusItem(todoColTitle, item);
    addTodoListItem(todoColTitle, item);
    store.setPlusHistory(todoColTitle, item);
    addHistory(todoColTitle, item);
    return {
      ...state,
    };
  } else if (action.type === "updateTodoItem") {
    const item = action.payload.item;
    const todoColTitle = action.payload.todoColTitle;
    store.setUpdateItem(todoColTitle, item);
    editTodoListItem(todoColTitle, item);
    store.setEditHistory(item);
    editHistory(item);
    return {
      ...state,
    };
  } else if (action.type === "deleteTodoItem") {
    const item = action.payload.item;
    const todoColTitle = action.payload.todoColTitle;
    store.setDeleteItem(todoColTitle, item);
    removeTodoListItem(todoColTitle, item);
    store.setRemoveHistory(todoColTitle, item);
    removeHistory(todoColTitle, item);
    return {
      ...state,
    };
  } else if (action.type === "moveTodoItem") {
    const {
      todoTitle,
      startColIndex,
      todoColTitleSrc,
      endColIndex,
      todoColTitleDst,
    } = action.payload;
    store.setChangeItem(
      startColIndex,
      todoColTitleSrc,
      endColIndex,
      todoColTitleDst
    );
    store.setMoveHistory(todoTitle, todoColTitleSrc, todoColTitleDst);
    moveTodoListItem(
      startColIndex,
      todoColTitleSrc,
      endColIndex,
      todoColTitleDst
    );
    moveHistory(todoColTitleSrc, todoColTitleDst, todoTitle);
  }

  return state;
}

export { store };
