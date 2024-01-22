import { cardDataTable } from "../../../../model/model.js";
import { EditCardFormView } from "../../../../view/Main/Column/Card/CardFormView.js";

const insertForm = (targetCard) => {
  targetCard.insertAdjacentHTML("beforebegin", EditCardFormView("editCard"));
};

const fillForm = (cardId) => {
  const editCardForm = document.querySelector(".card-form--edit");
  editCardForm.id = "form-" + cardId;
  const cardTitle = editCardForm.querySelector(".card-form__title");
  const cardContent = editCardForm.querySelector(".card-form__content");
  cardTitle.value = cardDataTable[cardId].title;
  cardContent.value = cardDataTable[cardId].content;
};

const hideCard = (targetCard) => {
  targetCard.style.display = "none";
};

const removeOpenedForm = (editForm) => {
  const hiddenCardId = editForm.id.split("-")[1];
  const hiddenCard = document.getElementById(hiddenCardId);
  hiddenCard.style.display = "flex";

  editForm.remove();
};

export const openEditCardForm = (target) => {
  const editForm = document.querySelector(".card-form--edit");
  const targetCard = target.closest("li");
  const cardId = targetCard.id;

  editForm && removeOpenedForm(editForm);

  insertForm(targetCard);
  fillForm(cardId);
  hideCard(targetCard);
};
