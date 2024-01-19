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
