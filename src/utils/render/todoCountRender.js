export function todoCountRender(todoTitle, countValue) {
  const countId = "count_" + todoTitle;
  const todoCount = document.getElementById(countId);
  todoCount.innerHTML = countValue;
}
