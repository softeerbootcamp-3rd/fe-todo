import { cardDataTable, columnDataTable } from "../../model/model.js";
import { ColumnView } from "./ColumnView/ColumnView.js";

export const MainView = () => {
  return `
<main class="main">
    ${Object.keys(columnDataTable)
      .map((columnId, idx) => {
        const cardIdList = columnDataTable[columnId].value;
        const cardDataList = cardIdList.map((cardId) => [cardId, cardDataTable[cardId]]);
        return ColumnView(idx, columnDataTable[columnId].title, cardDataList);
      })
      .join("")}   
  </main>
`;
};
