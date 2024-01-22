import { columnDataTable } from "../../../model/model.js";
import { CardView } from "./CardView/CardView.js";

export const CardListView = (columnId) => {
  const { value: cardList } = columnDataTable[columnId];
  return `
  <ul class="card-list" id="${columnId}-list">
    ${cardList.map((cardId) => CardView(cardId)).join("")}
  </ul>
    `;
};
