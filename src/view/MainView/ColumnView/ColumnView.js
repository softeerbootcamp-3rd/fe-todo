import { columnDataTable } from "../../../model/model.js";
import { CardListView } from "./CardListView/CardListView.js";

export const ColumnView = (columnId, idx) => {
  const { title, value } = columnDataTable[columnId];
  return `
  <section class="main__column" id="column${idx}">
    <nav class="main__column__nav">
      <div class="column__nav__info">
        <h2 class="column__nav__info__title">${title}</h2>
        <h6 class="column__nav__info__count">${value.length}</h6>
      </div>
      <div class="column__nav__btn-list">
        <button class="js-addCardBtn column__nav__btn-list__add-card-btn"></button>
        <button class="js-deleteColumnBtn column__nav__btn-list__delete-cloumn-btn"></button>
      </div>
    </nav>
   ${CardListView(columnId)}
  </section>    
    `;
};
