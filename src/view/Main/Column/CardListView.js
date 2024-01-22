import { CardView } from "./Card/CardView.js";
import { cardDataTable } from "../../../model/model.js";

export const CardListView = ({ value: cardList, columnId }) => {
  return `
  <ul class="card-list" id="${columnId}-list">
    ${cardList.map((cardId) => CardView(cardDataTable[cardId], cardId)).join("")}
  </ul>
    `;
};
