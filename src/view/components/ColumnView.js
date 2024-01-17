import { columnList } from "../../model/model.js";
import { CardView } from "./CardView.js";

export const ColumnView = (title) => {
  return `
    <section class="main__column">
    <nav class="main__column__nav">
      <div class="column__nav__info">
        <h2 class="column__nav__info__title">${title}</h2>
        <h6 class="column__nav__info__count">${columnList[title].length}</h6>
      </div>
      <div class="column__nav__btn-list">
        <button class="column__nav__btn-list__add-card-btn"></button>
        <button class="column__nav__btn-list__delete-cloumn-btn"></button>
      </div>
    </nav>
    <ul class="card-list">
      ${columnList[title].map((cardId) => CardView(cardId)).join("")}
    </ul>
  </section>    
    `;
};
