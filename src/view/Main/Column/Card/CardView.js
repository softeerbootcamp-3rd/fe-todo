export const CardView = ({ title, content, author }, cardId) => {
  return `
    <li class="card" id="${cardId}" draggable="true">
    <h3 class="card__title">${title}</h3>
    <p class="card__content">${content}</p>
    <p class="card__author">author by ${author}</p>
    <div class="card__btn-list">
      <button class="js-deleteCardBtn card__btn-list__delete-card-btn"></button>
      <button class="js-editCardBtn card__btn-list__edit-card-btn"></button>
    </div>
  </li>    
    `;
};
