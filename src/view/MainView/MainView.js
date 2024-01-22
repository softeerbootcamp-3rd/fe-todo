import { columnDataTable } from "../../model/model.js";
import { ColumnView } from "./ColumnView/ColumnView.js";

export const MainView = () => {
  return `
<main class="main">
    ${Object.keys(columnDataTable)
      .map((columnId, idx) => ColumnView(columnId, idx))
      .join("")}   
      </main>
`;
};
