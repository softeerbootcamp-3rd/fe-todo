import * as Card from "../card/index.js";
import * as AddCard from "../add-card/index.js";

export function template({ column }) {
  return `
      <h2 class="column__head">
      <span class="column__title text-bold display-bold16">
          ${column.columnName}
      </span>
      <div class="badge rounded-8 text-weak">${column.cards.length}</div>
      <button class="column__head-plus" data-editable=false data-column-id="${
        column.id
      }" type="button">
          <img src="./assets/icons/plus.svg" width='24' height='24' />
      <button class="column__head-close" type="button">
          <img src="./assets/icons/close.svg" width='24' height='24' />
      </button>
      </h2>
      <div class="column__cards-container" data-column-id="${column.id}">
        <ul class="column__cards" data-column-id="${column.id}">
        ${AddCard.template({ columnId: column.id })}
        ${column.cards
          .map((card) => Card.template({ columnId: column.id, card }))
          .join("")}
        </ul>
      </div>
    `;
}

document.querySelector("#app").addEventListener("click", (event) => {
  const target = event.target.closest(".column__head-plus");
  if (target === null) {
    return;
  }

  const columnId = target.getAttribute("data-column-id");
  const editable = target.getAttribute("data-editable") === "true";
  const addCard = document.querySelector(
    `.card__editable[data-column-id="${columnId}"]`
  );

  // addCard 초기화
  addCard.querySelector(".card__title-input").value = "";
  addCard.querySelector(".card__description-input").value = "";

  addCard.style.display = editable ? "none" : "flex";
  target.setAttribute("data-editable", !editable);
});

// drag and drop
document.querySelector("#app").addEventListener("dragstart", (event) => {
  const draggingCard = event.target.closest(".card");
  if (draggingCard === null) {
    return;
  }

  draggingCard.classList.add("dragging");
  const columnId = draggingCard.getAttribute("data-column-id");
  const cardId = draggingCard.getAttribute("data-card-id");
  console.log("dragstart" + columnId + "/" + cardId);
});

document.querySelector("#app").addEventListener("dragend", (event) => {
  const draggingCard = event.target.closest(".dragging");
  const column = event.target.closest(".column__cards");
  if (draggingCard === null) {
    return;
  }

  draggingCard.classList.remove("dragging");
  const columnId = draggingCard.getAttribute("data-column-id");
  const cardId = draggingCard.getAttribute("data-card-id");
  console.log(
    "dragend" + columnId + "->" + column.getAttribute("data-column-id")
  );
});

document.querySelector("#app").addEventListener("dragover", (event) => {
  const column = event.target.closest(".column__cards");
  const draggingCard = document.querySelector(".dragging");
  if (column === null || draggingCard === null) {
    return;
  }

  event.preventDefault();

  const afterElement = getDragAfterElement(column, event.clientY);
  if (afterElement === undefined) {
    column.appendChild(draggingCard);
  } else {
    column.insertBefore(draggingCard, afterElement);
  }
});

function getDragAfterElement(container, y) {
  // .draggable 클래스를 가지며 .dragging 클래스를 가지지 않은 모든 자식 요소를 가져옴.
  const draggableElements = [
    ...container.querySelectorAll(".card:not(.dragging)"),
  ];

  // reduce 함수를 사용하여 가장 가까운 요소를 찾습니다.
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();

      // 드래그 중인 요소를 드롭되어야 할 위치에 대해 Y 좌표에서의 offset을 계산
      const offset = y - box.top - box.height / 2;

      // offset이 0보다 작고 closest.offset 보다 클 경우, 가장 가까운 요소를 업데이트
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
