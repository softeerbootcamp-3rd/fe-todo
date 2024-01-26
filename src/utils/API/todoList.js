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
}

// 투두 리스트 아이템 옮기기
function moveTodoListItem(
  startColIndex,
  todoColTitleSrc,
  endColIndex,
  todoColTitleDst
) {
  let todoList = JSON.parse(localStorage.getItem("todoList"));
  const moveItem = todoList[todoColTitleSrc].splice(startColIndex, 1);
  todoList[todoColTitleDst].splice(endColIndex, 0, ...moveItem);
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

export {
  getTodoList,
  addTodoListItem,
  removeTodoListItem,
  editTodoListItem,
  moveTodoListItem,
};
