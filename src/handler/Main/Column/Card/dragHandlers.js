import { store } from "@/model/Store";
import { renderListCount } from "@/view/Main/Column/renderListCount";
import { getColumnList } from "@/util/getColumnList";
import { getHistoryTemplate } from "@/util/getHistoryTemplate";
import { addHistoryToServer, moveCardInServer } from "@/api/fetchServer";

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

const getNewHistory = ({ cardId, startColumnId, endColumnId }) => {
  const { author, title: cardTitle } = store.cardData[cardId];
  const { title: from } = store.columnData[startColumnId];
  const { title: to } = store.columnData[endColumnId];
  const newHistory = {
    ...getHistoryTemplate(),
    author,
    cardTitle,
    time: new Date(),
    from,
    to,
    type: "이동",
  };
  return newHistory;
};

export const onDrop = async (event) => {
  if (!container) return;

  const targetCardId = event.dataTransfer.getData("dragCardId");
  const startColumnId = event.dataTransfer.getData("startColumnId");
  const endColumnId = container.parentElement.id;
  const endColumnValue = getColumnList(endColumnId).map((li) => li.id);

  const movedColumn = await moveCardInServer({
    columnId: endColumnId,
    newColumnValue: endColumnValue,
  });
  store.moveCard(movedColumn);

  if (startColumnId !== endColumnId) {
    const stardColumnValue = getColumnList(startColumnId).map((li) => li.id);
    const movedColumn = await moveCardInServer({
      columnId: startColumnId,
      newColumnValue: stardColumnValue,
    });
    store.moveCard(movedColumn);

    renderListCount(document.querySelector(`#${startColumnId}`));
    renderListCount(document.querySelector(`#${endColumnId}`));

    const newHistory = getNewHistory({ cardId: targetCardId, startColumnId, endColumnId });
    const historyData = await addHistoryToServer(newHistory);
    store.addHistory(historyData);
  }
};
