import { addCardHandler } from "./MainView/ColumnView/addCardHandler.js";
import { closeCardFormHandler, closeEditCardFormHandler } from "./MainView/ColumnView/CardListView/CardFormView/closeCardFormHandler.js";
import { deleteCardHandler } from "./MainView/ColumnView/CardListView/CardView/deleteCardHandler.js";
import { onDragEnd, onDragOver, onDragStart, onDrop } from "./MainView/dragHandler.js";
import { editCardHandler } from "./MainView/ColumnView/CardListView/CardView/editCardHandler.js";
import { closeHistory, showHistory } from "./HistoryView/historyHandler.js";
import { inputCardHandler } from "./MainView/ColumnView/CardListView/CardFormView/inputCardHandler.js";
import { submitAddCardFormHandler } from "./MainView/ColumnView/CardListView/CardFormView/submitAddCardFormHandler.js";
import { submitEditCardFormHandler } from "./MainView/ColumnView/CardListView/CardFormView/submitEditCardFormHandler.js";

const clickHandlerMap = {
  "js-addCardBtn": addCardHandler,
  "js-editCardBtn": editCardHandler,
  "js-addFormCancel": closeCardFormHandler,
  "js-editFormCancel": closeEditCardFormHandler,
  "js-closeHistory": closeHistory,
  "js-openHistory": showHistory,
  "js-deleteCardBtn": deleteCardHandler,
};

const submitHandlerMap = {
  "js-addForm": submitAddCardFormHandler,
  "js-editForm": submitEditCardFormHandler,
};

const onClick = ({ target }) => {
  const executeHandler = clickHandlerMap[target.classList[0]];
  if (executeHandler) {
    executeHandler(target);
  }
};

const onSubmit = (event) => {
  event.preventDefault();
  const { target } = event;
  const executeHandler = submitHandlerMap[target.classList[0]];
  if (executeHandler) {
    executeHandler(target);
  }
};

export const initEventListener = () => {
  const app = document.querySelector("#app");
  app.addEventListener("click", onClick);
  app.addEventListener("submit", onSubmit);
  app.addEventListener("input", inputCardHandler);
  app.addEventListener("dragstart", onDragStart);
  app.addEventListener("dragover", onDragOver);
  app.addEventListener("dragend", onDragEnd);
  app.addEventListener("drop", onDrop);
};
