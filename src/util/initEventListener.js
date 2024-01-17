import { addCardHandler } from "../handler/addCardHandler.js";
import { closeCardFormHandler } from "../handler/closeCardFormHandler.js";
import { closeHistoryHandler, showHistory } from "../handler/historyHandler.js";
import { submitAddCardFormHandler } from "../handler/submitAddCardFormHandler.js";

const clickHandlerMap = {
  "js-addCardBtn": addCardHandler,
  "js-addFormCancel": closeCardFormHandler,
  "js-closeHistory": closeHistoryHandler,
  "js-openHistory": showHistory,
};

const onClick = ({ target }) => {
  const executeHandler = clickHandlerMap[target.classList[0]];
  if (executeHandler) {
    executeHandler(target);
  }
};

//FixIt
const submitHandlerMap = {
  "js-addForm": submitAddCardFormHandler,
  //"js-editForm": submitEditCardFormHandler,
};

const onSubmit = (event) => {
  event.preventDefault();
  const executeHandler = submitHandlerMap[target.classList[0]];
  if (executeHandler) {
    executeHandler(event.target);
  }
};

export const initEventListener = () => {
  const app = document.querySelector("#app");
  app.addEventListener("click", onClick);
  app.addEventListener("submit", onSubmit);
};
