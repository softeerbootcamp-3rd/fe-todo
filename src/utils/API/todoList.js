import { addHistory, editHistory, moveHistory, removeHistory } from "./history";

export function getTodoList() {
  const todoList = localStorage.getItem("todoList");
  if (todoList !== null) return JSON.parse(todoList);

  // 없을 경우 추가
  const initialTodoList = {
    "해야할 일": [],
    "하고 있는 일": [],
    "완료한 일": [],
  };
  localStorage.setItem("todoList", JSON.stringify(initialTodoList));

  return initialTodoList;
}

export function addTodoListItem(title, item) {
  const todoData = JSON.parse(localStorage.getItem("todoList"));
  todoData[title].unshift(item);
  localStorage.setItem("todoList", JSON.stringify(todoData));
  addHistory(title, item);
}

export function removeTodoListItem(title, index) {
  const todoData = JSON.parse(localStorage.getItem("todoList"));
  todoData[title].splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoData));
  removeHistory(title, item);
}

export function editTodoListItem(title, index, item) {
  const todoData = JSON.parse(localStorage.getItem("todoList"));
  todoData[title][index] = item;
  localStorage.setItem("todoList", JSON.stringify(todoData));
  editHistory(item);
}

export function moveTodoListItem(titleSrc, indexSrc, titleDst, indexDst) {
  const todoData = JSON.parse(localStorage.getItem("todoList"));
  const item = todoData[titleSrc].splice(indexSrc, 1)[0];
  todoData[titleDst].splice(indexDst, 0, item);
  localStorage.setItem("todoList", JSON.stringify(todoData));
  moveHistory(titleSrc, titleDst, item);
}
