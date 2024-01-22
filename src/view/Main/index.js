import { columnDataTable } from "../../model/model.js";
import ColumnView from "./Column/index.js";

const MainView = () => {
  return `
<main class="main">
    ${Object.keys(columnDataTable)
      .map((columnId, idx) => ColumnView(columnId, idx))
      .join("")}   
</main>
`;
};

export default MainView;
