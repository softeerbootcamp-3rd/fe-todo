import styles from "./todoList.module.scss";
import plusIcon from "../../asset/img/plus.svg";
import closedIcon from "../../asset/img/closed.svg";
import todoItem from "../todoItem";

export default function todoList(parent, props) {
  parent.innerHTML = `
        <div class="${styles.todoList}">
            <div class="${styles.todoList__header}">
                <div class="${styles.todoList__countWrapper}">
                    <h2 class="${styles.todoList__headerTitle}">${props.title}</h2>
                    <p class="${styles.todoList__count}">${props.items.length}</p>
                </div>
                
                <div class="${styles.todoList__btnContainer}">
                    <button class="actionBtn">
                        <img class="actionBtn__plus" src="${plusIcon}">
                    </button>
                    <button class="actionBtn">
                        <img class="actionBtn__closed" src="${closedIcon}">
                    </button>
                </div>
            </div>

            <div todo-data="items" class="${styles.todoList__content}">
            </div>
        </div>
    `;

  const itemsContainer = parent.querySelector('[todo-data="items"]');
  for (const item of props.items) {
    const todoItemWrapper = document.createElement("div");
    todoItem(todoItemWrapper, item);
    itemsContainer.appendChild(todoItemWrapper);
  }
}
