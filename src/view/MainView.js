import { columnList } from "../model/model.js";
import { ColumnView } from "./components/ColumnView.js";

export const MainView = () => {
  console.log(Object.keys(columnList));
  return `
<main class="main">
    ${Object.keys(columnList)
      .map((title) => ColumnView(title))
      .join("")}   
      </main>
`;
};
