import * as Column from "../column/index.js";
import * as Alert from "../alert/index.js";
import * as EditableCard from "../editable-card/index.js";
import { getLocalStorage, setLocalStorage } from "../../utils/local-storage.js";
import { store } from "../../store/index.js";
import { getDragAfterElement } from "../../utils/get-drag-after-element.js";

export function template({ columnId, card }) {
  return `
  <li data-column-id="${columnId}"
      data-card-id="${card.id}"
      class="card rounded-8 surface-default shadow-normal"
      draggable="true"
    >
    <div class="card__contents">
        <h3 class="card__title text-strong display-bold14">
            ${card.title}
        </h3>
        <p class="card__description text-default display-medium14">
            ${card.description}
        </p>
        <span class="card__author text-weak display-medium12">
            author by ${card.author}
        </span>
    </div>
    <div class="card__buttons">
        <button class="card__delete-button" type="button">
            <img src="./assets/icons/close.svg" width='24' height='24' />
        </button>
        <button class="card__edit-button" type="button">
            <img src="./assets/icons/edit.svg" width='24' height='24' />
        </button>
    </div>
  </li>
    `;
}

const render = () => {};
store.subscribe(render);

document.getElementById("app").addEventListener("click", (event) => {
  const cardDeleteButton = event.target.closest(".card__delete-button");
  if (cardDeleteButton === null) {
    return;
  }

  Alert.show({
    message: "선택한 카드를 삭제할까요?",
    onConfirm: () => {
      const card = cardDeleteButton.closest(".card");
      const columnId = card.getAttribute("data-column-id");
      const cardId = card.getAttribute("data-card-id");

      // FIXME: replace with store.dispatch and middleware
      const todolist = getLocalStorage("todolist");
      const selectedColumnIndex = todolist.findIndex(
        (item) => item.id === Number(columnId)
      );
      todolist[selectedColumnIndex].cards = todolist[
        selectedColumnIndex
      ].cards.filter((card) => card.id !== Number(cardId));
      setLocalStorage("todolist", todolist);

      // TODO: use dispatch and middleware
      // store.dispatch(deleteCard({ columnId, cardId }));

      // NOTE: 특정 칼럼에 대한 카드 리렌더링
      const column = document.querySelector(
        `.column[data-column-id="${columnId}"]`
      );
      column.innerHTML = `${Column.template({
        column: getLocalStorage("todolist")[selectedColumnIndex],
      })}`;

      Alert.close();
    },
  });
});

document.getElementById("app").addEventListener("click", (event) => {
  const cardEeleteButton = event.target.closest(".card__edit-button");
  if (cardEeleteButton === null) {
    return;
  }

  const card = cardEeleteButton.closest(".card");
  const columnId = card.getAttribute("data-column-id");
  const cardId = card.getAttribute("data-card-id");
  const title = card.querySelector(".card__title").innerText;
  const description = card.querySelector(".card__description").innerText;

  card.insertAdjacentHTML(
    "beforebegin",
    EditableCard.template({ columnId, cardId, title, description })
  );
  card.style.display = "none";
});

document.getElementById("app").addEventListener("dragstart", (event) => {
  const draggable = event.target.closest(".card");
  draggable.classList.add("dragging");

  // TODO: patch card
  // store.dispatch(moveCard({ columnId, cardId }));

  // TODO: render todo
});
document.getElementById("app").addEventListener("dragend", (event) => {
  const draggable = event.target.closest(".card");
  draggable.classList.remove("dragging");

  // TODO: patch card
  // store.dispatch(moveCard({ columnId, cardId }));

  // TODO: render todo
});

document.getElementById("app").addEventListener("dragover", (event) => {
  const column = event.target.closest(".column__cards");
  if (column === null) {
    return;
  }
  event.preventDefault();
  const afterElement = getDragAfterElement({
    draggableElements: column.querySelectorAll(".card:not(.dragging)"),
    y: event.clientY,
  });
  const draggable = document.querySelector(".dragging");
  column.insertBefore(draggable, afterElement);
});
