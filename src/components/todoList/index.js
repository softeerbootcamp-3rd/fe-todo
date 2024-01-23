import styles from "./todoList.module.scss";
import todoItemStyles from "../todoItem/todoItem.module.scss";
import plusIcon from "../../asset/img/plus.svg";
import closedIcon from "../../asset/img/closed.svg";
import todoItem from "../todoItem";

export default function todoList(renderTarget, initialData) {
  const views = mount(renderTarget, initialData);
  attachHandlers(views, initialData);
}

function attachHandlers(
  { renderTarget, newItemContainer, itemCount, itemsContainer, plusBtn },
  initialData
) {
  const createAndAddItem = (item, beforeElement) => {
    const todoItemWrapper = document.createElement("div");
    todoItem(todoItemWrapper, {
      todoColTitle: initialData.title,
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

  renderTarget.addEventListener("updateItemCount", (e) => {
    if (e.detail.propagate) {
      return;
    }
    e.stopPropagation();
    updateItemCount();
  });

  document.addEventListener("updateItemCount", updateItemCount);

  // 행 하나에 item으로 컴포넌트를 만들어서 마운트
  for (const item of initialData.items) {
    const todoItemWrapper = document.createElement("div");
    todoItem(todoItemWrapper, {
      todoColTitle: initialData.title,
      item,
      createAndAddItem,
    });
    itemsContainer.appendChild(todoItemWrapper);
  }

  // drag events
  renderTarget.addEventListener("dragover", (e) => {
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
        todoColTitle: initialData.title,
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

function mount(renderTarget, initialData) {
  renderTarget.innerHTML = /*html*/ `
    <div data-node="todoList" data-title="${initialData.title}" class="${styles.todoList}">
      <div class="${styles.todoList__header}">
        <div class="${styles.todoList__countWrapper}">
          <h2 class="${styles.todoList__headerTitle}">${initialData.title}</h2>
          <p data-node="itemCount" class="${styles.todoList__count}">${initialData.items.length}</p>
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

  const newItemContainer = renderTarget.querySelector(
    '[data-node="newItemContainer"]'
  );
  const itemCount = renderTarget.querySelector('[data-node="itemCount"]');
  const itemsContainer = renderTarget.querySelector('[data-node="items"]');
  const plusBtn = renderTarget.querySelector('[data-node="plusBtn"]');

  return {
    renderTarget,
    newItemContainer,
    itemCount,
    itemsContainer,
    plusBtn,
  };
}
