import { columnDataTable } from "../../model/model.js";
import ColumnView from "./Column";

const MainView = () => {
  return `
<main class="main">
    ${Object.keys(columnDataTable)
      .map((columnId) => ColumnView(columnDataTable[columnId], columnId))
      .join("")}   
</main>
`;
};

export default MainView;
