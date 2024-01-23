import todoList from "../todoList";
import styles from "./todoListTable.module.scss";
import { getTodoList } from "../../utils/API/todoList";

export default function todoListTable(target, data) {
  //행 + 데이터를 모두 감싸고 있는 컨테이너 (테이블)
  const views = mount(target, data);
  attachHandlers(views, data);
}

function attachHandlers({ target, todoListTable }, data) {
  //데이터 API호출 후, 각 todoList에 넣어서 각각 만들어주고 그것을 마운트해준다.
  const todoData = getTodoList();
  const todoDataEntries = Object.entries(todoData);
  for (const [todoColTitle, todoColData] of todoDataEntries) {
    const container = document.createElement("div");
    todoList(container, {
      title: todoColTitle,
      items: todoColData,
    });
    todoListTable.appendChild(container);
  }
}

function mount(target, data) {
  target.innerHTML = /*html*/ `
    <div data-node="todoListTable" class="${styles.todoListTable}">
    </div>
  `;

  const todoListTable = target.querySelector('[data-node="todoListTable"]');
  return { target, todoListTable };
}
