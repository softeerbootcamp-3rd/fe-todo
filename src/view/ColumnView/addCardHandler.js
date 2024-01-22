import { CardFormView } from "../view/components/CardFormView.js";

const openForm = (currentColumnId) => {
  document
    .querySelector(`#${currentColumnId}-list`)
    .insertAdjacentHTML("afterbegin", CardFormView("addForm"));
};

const closeForm = () => {
  document.querySelector(".card-form")?.remove();
};

export const addCardHandler = (target) => {
  const currentColumnId = target.closest(".main__column").id;
  const formColumn = document.querySelector(".card-form")?.closest(".main__column");
  if (formColumn) {
    closeForm();
  }
  if (formColumn?.id !== currentColumnId) {
    openForm(currentColumnId);
  }
};
