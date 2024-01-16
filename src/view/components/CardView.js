import { cardData } from "../../model/model.js";

export const CardView = (cardId) => {
  const { title, content, author } = cardData.cardId;
  return `
    <li class="card">
    <h3 class="card__title">${title}</h3>
    <p class="card__content">${content}</p>
    <p class="card__author">author by ${author}</p>
    <div class="card__btn-list">
      <button class="card__btn-list__delete-card-btn"></button>
      <button class="card__btn-list__edit-card-btn"></button>
    </div>
  </li>    
    `;
};
