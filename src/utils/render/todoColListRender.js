import todoList from "../../components/todoList";
import { applyDragAndDrop } from "../dragAndDrop";
export function todoColListRender(todoColTitle, todoColItems) {
  // 원하는 행을 관련 컴포넌트를 넣어준다.
  const container = document.getElementById(`container_${todoColTitle}`);
  todoList(container, {
    title: todoColTitle,
    items: Object.values(todoColItems),
  });
  const draggables = document.querySelectorAll('[todo-data="todoItem"]');
  const containers = document.querySelectorAll("[todo-data='items']");
  applyDragAndDrop(draggables, containers);
}
