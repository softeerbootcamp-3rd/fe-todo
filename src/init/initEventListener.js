import * as handler from "../handler";

const clickHandlerMap = {
  "js-openHistory": handler.header.showHistory,
  "js-closeHistory": handler.history.closeHistory,
  "js-addCardBtn": handler.main.column.openAddCardForm,
  "js-editCardBtn": handler.main.column.card.openEditCardForm,
  "js-deleteCardBtn": handler.main.column.card.clickDeleteCard,
  "js-addFormCancel": handler.main.column.cardForm.closeAddCardForm,
  "js-editFormCancel": handler.main.column.cardForm.closeEditCardForm,
};

const submitHandlerMap = {
  "js-addForm": handler.main.column.cardForm.submitAddCardForm,
  "js-editForm": handler.main.column.cardForm.submitEditCardForm,
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

const eventListeners = [
  { type: "click", handler: onClick },
  { type: "submit", handler: onSubmit },
  { type: "input", handler: handler.main.column.cardForm.toggleSubmitBtn },
  { type: "dragstart", handler: handler.main.column.card.onDragStart },
  { type: "dragover", handler: handler.main.column.card.onDragOver },
  { type: "dragend", handler: handler.main.column.card.onDragEnd },
  { type: "drop", handler: handler.main.column.card.onDrop },
];

export const initEventListener = () => {
  const app = document.querySelector("#app");
  eventListeners.forEach(({ type, handler }) => {
    app.addEventListener(type, handler);
  });
};
