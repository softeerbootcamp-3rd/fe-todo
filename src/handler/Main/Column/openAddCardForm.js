import { AddCardFormView } from "../../../view/Main/Column/Card/CardFormView.js";

const openForm = (currentColumnId) => {
  document
    .querySelector(`#${currentColumnId}-list`)
    .insertAdjacentHTML("afterbegin", AddCardFormView("addForm"));
};

const closeForm = () => {
  document.querySelector(".card-form")?.remove();
};

export const openAddCardForm = (target) => {
  const currentColumnId = target.closest(".main__column").id;
  const formColumn = document.querySelector(".card-form")?.closest(".main__column");
  if (formColumn) {
    closeForm();
  }
  if (formColumn?.id !== currentColumnId) {
    openForm(currentColumnId);
  }
};
