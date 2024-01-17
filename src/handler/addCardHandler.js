import { CardFormView } from "../view/components/CardFormView.js";

export const addCardHandler = (target) => {
  const columnId = target.closest(".main__column").id;
  document.querySelector(".card-form")?.remove();
  document
    .querySelector(`#${columnId}-list`)
    .insertAdjacentHTML("afterbegin", CardFormView("addForm"));
};
