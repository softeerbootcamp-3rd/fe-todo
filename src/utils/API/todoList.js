import { addHistory, editHistory, moveHistory, removeHistory } from "./history";
//list에 고유한 번호를 부여하기 위한 임시 변수

// 전체 투두리스트 불러와서 리턴
function getTodoList() {
  const todoList = localStorage.getItem("todoList");
  if (todoList !== null) {
    const todoObject = JSON.parse(todoList);
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

// 투두 리스트 아이템 추가
function addTodoListItem(title, item) {
  const newItem = { id: new Date().getTime(), ...item };
  const todoData = JSON.parse(localStorage.getItem("todoList"));
  todoData[title].unshift(newItem);
  localStorage.setItem("todoList", JSON.stringify(todoData));
  addHistory(title, newItem);
  return newItem;
}

// 투두 리스트 아이템 제거
function removeTodoListItem(colTitle, item) {
  const todos = localStorage.getItem("todoList");
  const todoData = JSON.parse(todos);
  for (let idx = 0; idx < todoData[colTitle].length; idx++) {
    if (todoData[colTitle][idx].id === item.id) {
      todoData[colTitle].splice(idx, 1);
      break;
    }
  }
  localStorage.setItem("todoList", JSON.stringify(todoData));
  removeHistory(colTitle, item);
}

// 투두 리스트 아이템 수정
function editTodoListItem(colTitle, item) {
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

// 투두 리스트 아이템 옮기기
function moveTodoListItem(todoId, todoColTitle, whereColIdx) {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  let findColTitle;
  let item;

  todoList = Object.entries(todoList);
  for (let colIdx = 0; colIdx < todoList.length; colIdx++) {
    const todoColList = todoList[colIdx][1];
    for (let itemIdx = 0; itemIdx < todoColList.length; itemIdx++) {
      if (todoColList[itemIdx].id === +todoId) {
        findColTitle = todoList[colIdx][0];
        item = todoColList[itemIdx];
        todoList[colIdx][1].splice(itemIdx, 1);
        todoList = Object.fromEntries(todoList);
        //수정 진행
        todoList[todoColTitle].splice(whereColIdx, 0, item);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        return;
      }
    }
  }
}

export {
  getTodoList,
  addTodoListItem,
  removeTodoListItem,
  editTodoListItem,
  moveTodoListItem,
};
