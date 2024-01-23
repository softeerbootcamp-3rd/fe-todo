import { ColumnView } from "./Column/ColumnView";

export const MainView = (columnDataTable) => {
  return `
<main class="main">
    ${Object.keys(columnDataTable)
      .map((columnId) => ColumnView(columnDataTable[columnId].title, columnId))
      .join("")}   
</main>
`;
};
