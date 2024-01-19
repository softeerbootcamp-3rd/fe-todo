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
          <button todo-data="plusBtn" class="actionBtn">
            <img class="actionBtn__plus" src="${plusIcon}" />
          </button>
          <button class="actionBtn">
            <img class="actionBtn__closed" src="${closedIcon}" />
          </button>
        </div>
      </div>
      <div todo-data="items" class="${styles.todoList__content}">
        <div todo-data="newItemContainer" style="display:none"></div>
      </div>
    </div>
  `;

  const newItemContainer = parent.querySelector(
    '[todo-data="newItemContainer"]'
  );

  const onAddItem = (isFront, item) => {
    const todoItemWrapper = document.createElement("div");
    todoItem(todoItemWrapper, { todoColTitle: props.title, item });
    if (isFront) {
      newItemContainer.insertAdjacentElement("afterend", todoItemWrapper);
      newItemContainer.style.display = "none";
    } else {
      itemsContainer.appendChild(todoItemWrapper);
    }
  };

  //행 하나에 item으로 컴포넌트를 만들어서 마운트
  const itemsContainer = parent.querySelector('[todo-data="items"]');
  for (const item of props.items) {
    onAddItem(false, item);
  }

  //추가 컴포넌트 등장 이벤트 추가
  const plusBtn = parent.querySelector('[todo-data="plusBtn"]');
  plusBtn.addEventListener("click", () => {
    if (newItemContainer.style.display === "none") {
      newItemContainer.style.display = "block";
      todoItem(newItemContainer, {
        todoColTitle: props.title,
        addMode: true,
        onCancel: () => {
          newItemContainer.style.display = "none";
        },
        onAddItem,
      });
    } else {
      newItemContainer.style.display = "none";
    }
  });
}
