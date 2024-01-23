import { CardView } from "./Card/CardView";

export const CardListView = ({ cardList, columnId, cardDataTable }) => {
  return `
  <ul class="card-list" id="${columnId}-list">
    ${cardList.map((cardId) => CardView(cardDataTable[cardId], cardId)).join("")}
  </ul>
    `;
};
