import styles from "./todoList.module.scss";
import todoItemStyles from "../todoItem/todoItem.module.scss";
import plusIcon from "../../asset/img/plus.svg";
import closedIcon from "../../asset/img/closed.svg";
import todoItem from "../todoItem";

export default function todoList(target, data) {
  const views = mount(target, data);
  attachHandlers(views, data);
}

function attachHandlers(
  { target, newItemContainer, itemCount, itemsContainer, plusBtn },
  data
) {
  const createAndAddItem = (item, beforeElement) => {
    const todoItemWrapper = document.createElement("div");
    todoItem(todoItemWrapper, {
      todoColTitle: data.title,
      item,
      createAndAddItem,
    });
    if (beforeElement === undefined) {
      // 새로운 아이템 등록 및 추가
      newItemContainer.insertAdjacentElement("afterend", todoItemWrapper);
      newItemContainer.style.display = "none";
      updateItemCount();
    } else {
      beforeElement.insertAdjacentElement("beforebegin", todoItemWrapper);
    }
  };

  const updateItemCount = () => {
    itemCount.innerText = itemsContainer.childElementCount - 1;
  };

  target.addEventListener("updateItemCount", (e) => {
    if (e.detail.propagate) {
      return;
    }
    e.stopPropagation();
    updateItemCount();
  });

  document.addEventListener("updateItemCount", updateItemCount);

  // 행 하나에 item으로 컴포넌트를 만들어서 마운트
  for (const item of data.items) {
    const todoItemWrapper = document.createElement("div");
    todoItem(todoItemWrapper, {
      todoColTitle: data.title,
      item,
      createAndAddItem,
    });
    itemsContainer.appendChild(todoItemWrapper);
  }

  // drag events
  target.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(
      `div.${todoItemStyles["todoItem--dragging"]}`
    ).parentNode;
    itemsContainer.appendChild(dragging);
    updateItemCount();
  });

  //추가 컴포넌트 등장 이벤트 추가
  plusBtn.addEventListener("click", () => {
    if (newItemContainer.style.display === "none") {
      newItemContainer.style.display = "block";
      todoItem(newItemContainer, {
        todoColTitle: data.title,
        addMode: true,
        onCancel: () => {
          newItemContainer.style.display = "none";
        },
        createAndAddItem,
      });
    } else {
      newItemContainer.style.display = "none";
    }
  });
}

function mount(target, data) {
  target.innerHTML = /*html*/ `
    <div data-node="todoList" data-title="${data.title}" class="${styles.todoList}">
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

  const newItemContainer = target.querySelector(
    '[data-node="newItemContainer"]'
  );
  const itemCount = target.querySelector('[data-node="itemCount"]');
  const itemsContainer = target.querySelector('[data-node="items"]');
  const plusBtn = target.querySelector('[data-node="plusBtn"]');

  return { target, newItemContainer, itemCount, itemsContainer, plusBtn };
}
