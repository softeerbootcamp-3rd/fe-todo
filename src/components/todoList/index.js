import styles from "./todoList.module.scss";
import plusIcon from "../../asset/img/plus.svg";
import closedIcon from "../../asset/img/closed.svg";
import todoItem from "../todoItem";
import { todoStore } from "../../stores/todoStore.js";
import { useStore } from "../../utils/store.js";
import { createComponent } from "../../utils/ui.js";

export default function todoList(renderTarget, initialData) {
  const views = render(renderTarget, initialData);
  const store = attachStore(views, initialData);
  attachHandlers(views, store, initialData);
  return store.destroy;
}

function attachStore({ newItemContainer, itemCount }, initialData) {
  const childComponents = new Map();
  // 스토어가 업데이트 될때마다 실행되는 함수
  const updateView = (list) => {
    if (list === undefined) return;
    // reset mounted flag
    for (const component of childComponents.values()) {
      component.mounted = false;
    }

    // create & mount components in order one by one
    let previousElement = newItemContainer;
    for (const { id } of list) {
      let component = childComponents.get(id);
      if (!component) {
        // 맵에 없음: 새로 생성
        component = createComponent(todoItem, {
          listTitle: initialData.title,
          id,
        });
        childComponents.set(id, component);
      }

      previousElement.insertAdjacentElement("afterend", component.element);
      component.mounted = true;
      previousElement = component.element;
    }

    // destroy unmounted components
    for (const [id, component] of childComponents.entries()) {
      if (component.mounted) continue;
      component.element.parentNode.removeChild(component.element);
      component.destroy();
      childComponents.delete(id);
    }

    // update count
    itemCount.innerText = list.length;
  };

  const store = useStore(
    todoStore,
    updateView,
    (state) => state.todoList[initialData.title]
  );

  return store;
}

function attachHandlers(
  { renderTarget, newItemContainer, itemsContainer, plusBtn },
  {},
  initialData
) {
  // drag 이벤트
  const dragOver = (e) => {
    e.preventDefault();
  };

  let count = 0;
  const dragEnter = (e) => {
    e.preventDefault();
    if (count++ !== 0) return;

    const { drag, doDrag } = todoStore.getState();
    if (drag === undefined) return;
    const { src, dst } = drag;
    const idSrc = src.id;
    const titleSrc = dst?.title ?? src.title;
    doDrag(titleSrc, idSrc, initialData.title, undefined);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    count--;
  };

  const drop = () => {
    count = 0;
  };

  // 등록 카드 생성 & 삭제
  let destroyAddModeCard;
  const toggleAddModeCard = () => {
    // 존재한다면 삭제
    if (destroyAddModeCard) destroyAddModeCard();
    if (newItemContainer.style.display === "none") {
      destroyAddModeCard = todoItem(newItemContainer, {
        listTitle: initialData.title,
        addMode: true,
        onCancel: () => (newItemContainer.style.display = "none"),
      });
      newItemContainer.style.display = "block";
    } else {
      newItemContainer.style.display = "none";
    }
  };

  renderTarget.addEventListener("dragover", dragOver);
  renderTarget.addEventListener("dragenter", dragEnter);
  renderTarget.addEventListener("dragleave", dragLeave);
  renderTarget.addEventListener("drop", drop);
  plusBtn.addEventListener("click", toggleAddModeCard);
}

function render(renderTarget, initialData) {
  renderTarget.innerHTML = /*html*/ `
    <div data-node="todoList" class="${styles.todoList}">
      <div class="${styles.todoList__header}">
        <div class="${styles.todoList__countWrapper}">
          <h2 class="${styles.todoList__headerTitle}">${initialData.title}</h2>
          <p data-node="itemCount" class="${styles.todoList__count}">-</p>
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
