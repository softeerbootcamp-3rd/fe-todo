import { columnIdToCardList } from "../../model/helper.js";
import { columnDataTable } from "../../model/model.js";
import { ColumnView } from "./ColumnView/ColumnView.js";

export const MainView = () => {
  return `
<main class="main">
    ${Object.keys(columnDataTable)
      .map((columnId, idx) => {
        return ColumnView(idx, columnDataTable[columnId].title, columnIdToCardList(columnId));
      })
      .join("")}   
  </main>
`;
};
