import { cardData, columnList, historyData } from "../model/model.js";
import { CardView } from "../view/components/CardView.js";

let cardId = 3;

const addFormData = (target) => {
  const formData = new FormData(target);
  formData.set("author", "web");
  formData.set("createdAt", Date.now()); //Todo - Real-time!!
  formData.set("cardId", cardId);
  cardData[cardId] = Object.fromEntries(formData);
};

const insertNewCard = (target) => {
  target.insertAdjacentHTML("afterend", CardView(cardId++));
};

export const submitAddCardFormHandler = (target) => {
  addFormData(target);
  insertNewCard(target);
  target.remove();
};
