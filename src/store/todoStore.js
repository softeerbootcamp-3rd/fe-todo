import { createStore } from "./store";
import { addTodoListItem } from "../utils/API/todoList";

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

// reducer함수 구현
function reducer(state = {}, action) {
  //값을 받아서 state에 추가
  if (action.type === "plusTodoItem") {
    const todoColTitle = action.payload.todoColTitle;
    const item = action.payload.item;
    store.setPlusItem(todoColTitle, item);
    addTodoListItem(todoColTitle, item);
    return {
      ...state,
    };
  }

  return state;
}

function showState() {
  console.log(store.getState());
}

store.subscribe(showState);

export { store };
