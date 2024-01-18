import { cardDataTable } from "../model/model.js";
import { CardFormView } from "../view/components/CardFormView.js";

const insertForm = (targetCard) => {
  targetCard.insertAdjacentHTML("beforebegin", CardFormView("editCard"));
};

const fillForm = (cardId) => {
  const cardTitle = document.querySelector(".card-form__title");
  const cardContent = document.querySelector(".card-form__content");
  cardTitle.value = cardDataTable[cardId].title;
  cardContent.value = cardDataTable[cardId].content;
};

const hideCard = (targetCard) => {
  targetCard.style.display = "none";
};

export const editCardHandler = (target) => {
  const targetCard = target.closest("li");
  const cardId = targetCard.id;
  insertForm(targetCard);
  fillForm(cardId);
  hideCard(targetCard);
};
