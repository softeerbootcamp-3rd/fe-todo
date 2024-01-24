import { columnIdToCardList } from "../../model/helper.js";
import { store } from "../../model/store.js";
import { ColumnView } from "./ColumnView/ColumnView.js";

export const MainView = () => {
  return `
<main class="main">
    ${store.getColumnIdList()
      .map((columnId) => {
        return ColumnView(columnId, store.getColumnTitle(columnId), columnIdToCardList(columnId));
      })
      .join("")}   
  </main>
`;
};
