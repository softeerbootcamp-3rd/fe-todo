import { AddCardFormView } from "../view/components/AddCardFormView.js";

export const addCardHandler = (target) => {
  const columnId = target.closest(".main__column").id;
  document.querySelector(`#${columnId}-list`).insertAdjacentHTML("afterbegin", AddCardFormView());
};
