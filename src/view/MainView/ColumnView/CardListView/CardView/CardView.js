export const CardView = (cardData) => {
  const { title, content, author } = cardData[1].get();
  return `
    <li class="card" id="${cardData[0]}" draggable="true">
    ${CardTitleView(title)}
    ${CardContentView(content)}
    ${CardAuthorView(author)}
    <div class="card__btn-list">
      <button class="js-deleteCardBtn card__btn-list__delete-card-btn"></button>
      <button class="js-editCardBtn card__btn-list__edit-card-btn"></button>
    </div>
  </li>    
    `;
};

export const CardTitleView = (title) => {
  return `
    <h3 class="card__title">${title}</h3>
    `;
}
export const CardContentView = (content) => {
  return `
    <p class="card__content">${content}</p>
    `;
}
export const CardAuthorView = (author) => {
  return `
    <p class="card__author">author by ${author}</p>
    `;
}