import todoList from "../todoList";
import styles from "./todoListTable.module.scss";

export default function todoListTable(parent, props) {
  parent.innerHTML = `
    <div todo-data="todoListTable" class="${styles.todoListTable}">
        
    </div>
    `;

  const todoListTable = parent.querySelector('[todo-data="todoListTable"]');

  // 컬럼 생성
  const todoDataEntries = Object.entries(props.todoData);

  for (const [todoColName, todoColData] of todoDataEntries) {
    const container = document.createElement("div");
    todoList(container, { title: todoColName, items: todoColData });
    todoListTable.appendChild(container);
  }
}
