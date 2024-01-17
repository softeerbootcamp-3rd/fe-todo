import { addCardHandler } from "../handler/addCardHandler.js";

const clickHandlerMap = { "js-addCardBtn": addCardHandler };

const onClick = ({ target }) => {
  const executeHandler = clickHandlerMap[target.classList[0]];
  if (executeHandler) {
    executeHandler(target);
  }
};

export const initEventListener = () => {
  const app = document.querySelector("#app");
  app.addEventListener("click", onClick);
};
