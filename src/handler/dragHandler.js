import { columnDataTable } from "../model/model";
import { renderListCount } from "../util/render";

export const onDragStart = (event) => {
  const { target } = event;
  event.dataTransfer.setData("startColumnId", target.closest(".main__column").id);
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

export const onDrop = (event) => {
  const { target } = event;
  if (!target) return;
  target.classList.remove("dragging");
  console.log(target);
  const startColumnId = event.dataTransfer.getData("startColumnId");
  const endColumnId = container.parentElement.id;

  console.log("start", startColumnId, "end", endColumnId);
  if (!endColumnId) return;

  columnDataTable[endColumnId].value = [...container.children].map((li) => li.id);
  if (startColumnId !== endColumnId) {
    columnDataTable[startColumnId].value = [
      ...document.querySelector(`#${startColumnId}-list`).children,
    ].map((li) => li.id);
    renderListCount(document.querySelector(`#${startColumnId}`));
    renderListCount(document.querySelector(`#${endColumnId}`));
  }
};
