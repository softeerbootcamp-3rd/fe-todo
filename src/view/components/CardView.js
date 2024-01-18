import { cardDataTable } from "../../model/model.js";

export const CardView = (cardId) => {
  const { title, content, author } = cardDataTable[cardId];
  return `
    <li class="card" id="${cardId}">
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
