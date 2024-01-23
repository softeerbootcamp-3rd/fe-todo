import styles from "./todoList.module.scss";
import plusIcon from "../../asset/img/plus.svg";
import closedIcon from "../../asset/img/closed.svg";

export function todoListTemplate(props) {
  return `<div class="${styles.todoList}">
    <div class="${styles.todoList__header}">
      <div class="${styles.todoList__countWrapper}">
        <h2 class="${styles.todoList__headerTitle}">${props.title}</h2>
        <p todo-data="itemCount" class="${styles.todoList__count}">${props.items.length}</p>
      </div>
      <div class="${styles.todoList__btnContainer}">
        <button todo-data="plusBtn" class="actionBtn">
          <img class="actionBtn__plus" src="${plusIcon}" />
        </button>
        <button class="actionBtn">
          <img class="actionBtn__closed" src="${closedIcon}" />
        </button>
      </div>
    </div>
    <div todo-data="items" id="todoCol_${props.title}" class="${styles.todoList__content}">
      <div todo-data="newItemContainer" style="display:none"></div>
    </div>
  </div>
`;
}
