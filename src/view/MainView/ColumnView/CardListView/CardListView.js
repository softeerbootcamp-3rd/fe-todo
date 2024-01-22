import { CardView } from "./CardView/CardView.js";

export const CardListView = (cardDataList, idx) => {
  return `
  <ul class="card-list" id="column${idx}-list">
    ${cardDataList.map((cardData) => CardView(cardData)).join("")}
  </ul>
    `;
};
