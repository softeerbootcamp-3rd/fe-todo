import styles from "./todoList.module.scss";
import plusIcon from "../../asset/img/plus.svg";
import closedIcon from "../../asset/img/closed.svg";
import todoItem from "../todoItem";

export default function todoList(target, data) {
  target.innerHTML = template(data);
  controller(target, data);
}

function controller(target, data) {
  const newItemContainer = target.querySelector(
    '[data-node="newItemContainer"]'
  );

  const itemCount = target.querySelector('[data-node="itemCount"]');

  const onAddItem = (isNew, item) => {
    const todoItemWrapper = document.createElement("div");
    todoItem(todoItemWrapper, {
      todoColTitle: data.title,
      item,
      onDeleteItem,
    });
    if (isNew) {
      // 새로운 아이템 등록 및 추가
      newItemContainer.insertAdjacentElement("afterend", todoItemWrapper);
      newItemContainer.style.display = "none";
      itemCount.innerText = parseInt(itemCount.innerText) + 1;
    } else {
      // 초기 데이터의 아이템 렌더시 사용
      itemsContainer.appendChild(todoItemWrapper);
    }
  };

  const onDeleteItem = () => {
    itemCount.innerText = parseInt(itemCount.innerText) - 1;
  };

  //행 하나에 item으로 컴포넌트를 만들어서 마운트
  const itemsContainer = target.querySelector('[data-node="items"]');
  for (const item of data.items) {
    onAddItem(false, item);
  }

  //추가 컴포넌트 등장 이벤트 추가
  const plusBtn = target.querySelector('[data-node="plusBtn"]');
  plusBtn.addEventListener("click", () => {
    if (newItemContainer.style.display === "none") {
      newItemContainer.style.display = "block";
      todoItem(newItemContainer, {
        todoColTitle: data.title,
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

function template(data) {
  return `
    <div class="${styles.todoList}">
      <div class="${styles.todoList__header}">
        <div class="${styles.todoList__countWrapper}">
          <h2 class="${styles.todoList__headerTitle}">${data.title}</h2>
          <p data-node="itemCount" class="${styles.todoList__count}">${data.items.length}</p>
        </div>
        <div class="${styles.todoList__btnContainer}">
          <button data-node="plusBtn" class="actionBtn">
            <img class="actionBtn__plus" src="${plusIcon}" />
          </button>
          <button class="actionBtn">
            <img class="actionBtn__closed" src="${closedIcon}" />
          </button>
        </div>
      </div>
      <div data-node="items" class="${styles.todoList__content}">
        <div data-node="newItemContainer" style="display:none"></div>
      </div>
    </div>
  `;
}
