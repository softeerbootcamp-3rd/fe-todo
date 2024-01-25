import { store } from "../../model/store.js";
import { renderListCount } from "../render.js";
import { historyDataTemplate } from "../../model/historyDataTemplate.js";

//Fixme: 이동이 취소되었을 때 Ghost 위치로 View가 이동하지만 Store는 갱신되지 않는다.

export const onDragStart = (event) => {
  const { target } = event;
  event.dataTransfer.setData("startColumnId", target.closest(".main__column").id);
  event.dataTransfer.setData("dragCardId", target.id);
  setTimeout(() => target.classList.add("dragging"), 0);
};

const getDragAfterElement = (container, y) => {
  const draggableElements = [...container.querySelectorAll(".card:not(.dragging)")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

let container = null;

export const onDragOver = (event) => {
  event.preventDefault();
  const { target } = event;
  container = target.closest(".card-list");
  if (!container) return;

  const afterElement = getDragAfterElement(container, event.clientY);
  const draggable = document.querySelector(".dragging");

  if (afterElement === undefined) {
    container.appendChild(draggable);
  } else {
    container.insertBefore(draggable, afterElement);
  }
};

export const onDragEnd = (event) => {
  event.target.classList.remove("dragging");
};

const getMovedIndex = (cardId, columnId) => {
  return [...document.querySelector(`#${columnId}-list`).children].findIndex(
    (li) => li.id === cardId
  );
  //store.moveCard()
};

export const onDrop = (event) => {
  if (!container) return;

  const cardId = event.dataTransfer.getData("dragCardId");
  const fromColumnId = event.dataTransfer.getData("startColumnId");
  const toColumnId = container.parentElement.id;

  const index = getMovedIndex(cardId, toColumnId);
  store.moveCard({cardId, fromColumnId, toColumnId, index});
};
