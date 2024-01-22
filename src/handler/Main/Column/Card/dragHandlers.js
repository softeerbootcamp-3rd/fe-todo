import { cardDataTable, columnDataTable, historyDataList } from "../../../../model/model";
import { renderListCount } from "../../../../util/render";
import { historyDataTemplate } from "../../../../util/historyDataTemplate";

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

const addHistory = (targetCardId, startColumnId, endColumnId) => {
  const { author: username, title: cardTitle } = cardDataTable[targetCardId];
  const { title: from } = columnDataTable[startColumnId];
  const { title: to } = columnDataTable[endColumnId];
  const newHistory = {
    ...historyDataTemplate,
    username,
    cardTitle,
    time: new Date(),
    from,
    to,
    type: "이동",
  };

  historyDataList.unshift(newHistory);
};

const updateColumnModel = (columnId) => {
  columnDataTable[columnId].value = [...document.querySelector(`#${columnId}-list`).children].map(
    (li) => li.id
  );
};

export const onDrop = (event) => {
  if (!container) return;

  const targetCardId = event.dataTransfer.getData("dragCardId");
  const startColumnId = event.dataTransfer.getData("startColumnId");
  const endColumnId = container.parentElement.id;

  updateColumnModel(endColumnId);

  if (startColumnId !== endColumnId) {
    updateColumnModel(startColumnId);

    renderListCount(document.querySelector(`#${startColumnId}`));
    renderListCount(document.querySelector(`#${endColumnId}`));

    addHistory(targetCardId, startColumnId, endColumnId);
  }
};
