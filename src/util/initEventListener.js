import { addCardHandler } from "../handler/addCardHandler.js";
import { closeCardFormHandler } from "../handler/closeCardFormHandler.js";
import { deleteCardHandler } from "../handler/deleteCardHandler.js";
import { closeHistory, showHistory } from "../handler/historyHandler.js";
import { inputCardHandler } from "../handler/inputCardHandler.js";
import { submitAddCardFormHandler } from "../handler/submitAddCardFormHandler.js";

const clickHandlerMap = {
  "js-addCardBtn": addCardHandler,
  "js-addFormCancel": closeCardFormHandler,
  "js-closeHistory": closeHistory,
  "js-openHistory": showHistory,
  "js-deleteCardBtn": deleteCardHandler,
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
};
