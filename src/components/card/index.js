import * as Column from "../column/index.js";
import * as Alert from "../alert/index.js";
import * as EditableCard from "../editable-card/index.js";
import { getDragAfterElement } from "../../utils/get-drag-after-element.js";
import { setEvent } from "../../utils/set-event.js";
import * as todos from "../../features/todos/index.js";

const app = document.getElementById("app");

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

setEvent(app, "click", (event) => {
  const deleteButton = event.target.closest(".card__delete-button");
  if (!deleteButton) return;

  Alert.show({
    message: "선택한 카드를 삭제할까요?",
    onConfirm: async () => {
      const card = deleteButton.closest(".card");
      const columnId = card.getAttribute("data-column-id");
      const cardId = card.getAttribute("data-card-id");

      await todos.deleteCard({
        data: { columnId, cardId },
        onChange: (state) =>
          Column.render({
            column: state.todos.find((column) => column.id === columnId),
          }),
      });

      Alert.close();
    },
  });
});

setEvent(app, "click", (event) => {
  const editButton = event.target.closest(".card__edit-button");
  if (editButton === null) {
    return;
  }

  const card = editButton.closest(".card");
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

setEvent(app, "dragstart", (event) => {
  const draggable = event.target.closest(".card");
  draggable.classList.add("dragging");
});

setEvent(app, "dragend", async (event) => {
  const draggable = event.target.closest(".card");
  draggable.classList.remove("dragging");

  const columnId = draggable.getAttribute("data-column-id");
  const cardId = draggable.getAttribute("data-card-id");
  const currentColumn = draggable.closest(".column__cards");
  const currentColumnId = currentColumn.getAttribute("data-column-id");

  if (currentColumnId === columnId) return;
  // FIXME
  // where can i inject the logic for `success` or `error` case
  // `onSuccess` or `onError`?
  await todos.moveCard({
    data: { columnId, cardId, currentColumnId },
    onChange: (state) => {},
  });
  // FIXME when just `success` case
  draggable.setAttribute("data-column-id", columnId);
});

setEvent(app, "dragover", (event) => {
  const column = event.target.closest(".column__cards");
  if (column === null) {
    return;
  }
  event.preventDefault();
  // FIXME afterElement 가 undefined인 상황 예외 처리
  const afterElement = getDragAfterElement({
    draggableElements: column.querySelectorAll(".card:not(.dragging)"),
    y: event.clientY,
  });
  const draggable = document.querySelector(".dragging");
  column.insertBefore(draggable, afterElement);
});
