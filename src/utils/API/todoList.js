import { addHistory, editHistory, moveHistory, removeHistory } from "./history";

let idCount = 0;

export function getTodoList() {
  const todoList = localStorage.getItem("todoList");
  if (todoList !== null) {
    const todoObject = JSON.parse(todoList);
    Object.values(todoObject).forEach((todoColArr) => {
      todoColArr.forEach((todo) => {
        idCount = Math.max(idCount, todo.id);
      });
    });
    return todoObject;
  }

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
  const newItem = { id: ++idCount, ...item };
  const todoData = JSON.parse(localStorage.getItem("todoList"));
  todoData[title].unshift(newItem);
  localStorage.setItem("todoList", JSON.stringify(todoData));
  addHistory(title, newItem);
  return newItem;
}

export function removeTodoListItem(colTitle, item) {
  const todoData = JSON.parse(localStorage.getItem("todoList"));
  for (let idx = 0; idx < todoData[colTitle].length; idx++) {
    if (todoData[colTitle][idx].id === item.id) {
      todoData[colTitle].splice(idx, 1);
      break;
    }
  }
  localStorage.setItem("todoList", JSON.stringify(todoData));
  removeHistory(colTitle, item);
}

export function editTodoListItem(colTitle, item) {
  const todoData = JSON.parse(localStorage.getItem("todoList"));
  for (let idx = 0; idx < todoData[colTitle].length; idx++) {
    if (todoData[colTitle][idx].id === item.id) {
      todoData[colTitle][idx] = item;
      break;
    }
  }
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
