import { columnList } from "../model/model.js";
import { ColumnView } from "./components/ColumnView.js";

export const MainView = () => {
  return `
<main class="main">
    ${Object.keys(columnList)
      .map((title, idx) => ColumnView(title, idx))
      .join("")}   
      </main>
`;
};
