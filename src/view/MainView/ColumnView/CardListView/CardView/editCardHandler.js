import { store } from "../../../../../model/store.js";
import { EditCardFormView } from "../CardFormView/CardFormView.js";

const insertForm = (targetCard) => {
  targetCard.insertAdjacentHTML("beforebegin", EditCardFormView("editCard"));
};

const fillForm = (cardId) => {
  const editCardForm = document.querySelector(".card-form--edit");
  editCardForm.id = "form-" + cardId;
  const cardTitle = editCardForm.querySelector(".card-form__title");
  const cardContent = editCardForm.querySelector(".card-form__content");
  ({title: cardTitle.value, content: cardContent.value} = store.getCard(cardId));
};

const hideCard = (targetCard) => {
  targetCard.style.display = "none";
};

export const editCardHandler = (target) => {
  const editForm = document.querySelector(".card-form--edit");
  if (editForm) {
    const hiddenCardId = editForm.id.split("-")[1];
    const hiddenCard = document.getElementById(hiddenCardId);
    hiddenCard.style.display = "flex";

    editForm.remove();
  }

  const targetCard = target.closest("li");
  const cardId = targetCard.id;
  insertForm(targetCard);
  fillForm(cardId);
  hideCard(targetCard);
};
