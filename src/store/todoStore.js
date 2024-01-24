import { createStore } from "./store";
import {
  addTodoListItem,
  editTodoListItem,
  removeTodoListItem,
  moveTodoListItem,
} from "../utils/API/todoList";

let initTodoList = {
  "해야할 일": [],
  "하고 있는 일": [],
  "완료한 일": [],
};

const existenceTodoList = JSON.parse(localStorage.getItem("todoList"));
const existenceHistory = JSON.parse(localStorage.getItem("history"));
let inStoreData;
//이미 존재하는 값이 없으면 초기값으로 설정
if (!existenceTodoList) {
  localStorage.setItem("todoList", JSON.stringify(initTodoList));
  inStoreData = { initStore, history: existenceHistory };
} else {
  inStoreData = { todoList: existenceTodoList, history: existenceHistory };
}

const store = createStore(inStoreData, reducer);

// reducer함수 => 여기선 state를 변경 + API서버로의 변경까지 진행
function reducer(state = {}, action) {
  //값을 받아서 state에 추가
  if (action.type === "plusTodoItem") {
    const item = action.payload.item;
    const todoColTitle = action.payload.todoColTitle;
    store.setPlusItem(todoColTitle, item);
    addTodoListItem(todoColTitle, item);
    return {
      ...state,
    };
  } else if (action.type === "updateTodoItem") {
    const item = action.payload.item;
    const todoColTitle = action.payload.todoColTitle;
    store.setUpdateItem(todoColTitle, item);
    editTodoListItem(todoColTitle, item);
    return {
      ...state,
    };
  } else if (action.type === "deleteTodoItem") {
    const item = action.payload.item;
    const todoColTitle = action.payload.todoColTitle;
    store.setDeleteItem(todoColTitle, item);
    removeTodoListItem(todoColTitle, item);
    return {
      ...state,
    };
  } else if (action.type === "changeTodoItem") {
    const todoId = action.payload.todoId;
    const todoColTitle = action.payload.todoColTitle.replace("todoCol_", "");
    const whereColIdx = action.payload.whereColIdx;

    store.setChangeItem(todoId, todoColTitle, whereColIdx);
    moveTodoListItem(todoId, todoColTitle, whereColIdx);
  }

  return state;
}

export { store };
