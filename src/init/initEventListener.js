import * as handler from "../handler";

const {
  main: { column },
  history,
  header,
} = handler;

const clickHandlerMap = {
  "js-openHistory": header.showHistory,
  "js-closeHistory": history.closeHistory,
  "js-addCardBtn": column.openAddCardForm,
  "js-editCardBtn": column.card.openEditCardForm,
  "js-deleteCardBtn": column.card.clickDeleteCard,
  "js-addFormCancel": column.cardForm.closeAddCardForm,
  "js-editFormCancel": column.cardForm.closeEditCardForm,
  "js-deleteHistory": history.deleteHistory,
  "js-deleteCancel": column.card.cancelDeleteCard,
  "js-deleteConfirm": column.card.deleteCard,
};

const submitHandlerMap = {
  "js-addForm": column.cardForm.submitAddCardForm,
  "js-editForm": column.cardForm.submitEditCardForm,
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
  { type: "input", handler: column.cardForm.toggleSubmitBtn },
  { type: "dragstart", handler: column.card.onDragStart },
  { type: "dragover", handler: column.card.onDragOver },
  { type: "dragend", handler: column.card.onDragEnd },
  { type: "drop", handler: column.card.onDrop },
];

export const initEventListener = () => {
  const app = document.querySelector("#app");
  eventListeners.forEach(({ type, handler }) => {
    app.addEventListener(type, handler);
  });
};
