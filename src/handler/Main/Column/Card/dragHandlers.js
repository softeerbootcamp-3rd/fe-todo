import { store } from "@/model/Store";
import { renderListCount } from "@/view/Main/Column/renderListCount";
import { getColumnList } from "@/util/getColumnList";

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

export const onDrop = (event) => {
  if (!container) return;

  const targetCardId = event.dataTransfer.getData("dragCardId");
  const startColumnId = event.dataTransfer.getData("startColumnId");
  const endColumnId = container.parentElement.id;
  const endColumnValue = getColumnList(endColumnId).map((li) => li.id);

  store.moveCard({ columnId: endColumnId, newColumnValue: endColumnValue });

  if (startColumnId !== endColumnId) {
    const stardColumnValue = getColumnList(startColumnId).map((li) => li.id);
    store.moveCard({ columnId: startColumnId, newColumnValue: stardColumnValue });

    renderListCount(document.querySelector(`#${startColumnId}`));
    renderListCount(document.querySelector(`#${endColumnId}`));

    store.setMoveCardHistory({ cardId: targetCardId, startColumnId, endColumnId });
  }
};
