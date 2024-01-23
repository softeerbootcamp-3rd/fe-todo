import { CardListView } from "./CardListView";

export const ColumnView = (title, columnId) => {
  return `
  <section class="main__column" id="${columnId}">
    <nav class="main__column__nav">
      <div class="column__nav__info">
        <h2 class="column__nav__info__title">${title}</h2>
        <h6 class="column__nav__info__count"></h6>
      </div>
      <div class="column__nav__btn-list">
        <button class="js-addCardBtn column__nav__btn-list__add-card-btn"></button>
        <button class="js-deleteColumnBtn column__nav__btn-list__delete-cloumn-btn"></button>
      </div>
    </nav>
   ${CardListView({ cardList: [], columnId, cardDataTable: {} })}
  </section>
  `;
};
