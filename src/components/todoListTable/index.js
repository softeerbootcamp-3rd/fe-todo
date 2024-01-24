import { store } from "../../store/todoStore";
import todoList from "../todoList";
import { todoListTableTemplate } from "./template";
export default function todoListTable(parent, props) {
  //행 + 데이터를 모두 감싸고 있는 컨테이너 (테이블)
  parent.innerHTML = todoListTableTemplate(props);

  //데이터 API호출 후, 각 todoList에 넣어서 각각 만들어주고 그것을 마운트해준다.
  const todoListTable = parent.querySelector('[todo-data="todoListTable"]');
  const todoDataEntries = Object.entries(props.todoList);

  for (const [todoColTitle, todoColData] of todoDataEntries) {
    const container = document.createElement("div");
    container.id = `container_${todoColTitle}`;
    todoList(container, {
      title: todoColTitle,
      items: todoColData,
    });
    todoListTable.appendChild(container);
  }
}
