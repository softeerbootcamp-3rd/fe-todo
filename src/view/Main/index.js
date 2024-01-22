import ColumnView from "./Column";

const MainView = (columnDataTable) => {
  return `
<main class="main">
    ${Object.keys(columnDataTable)
      .map((columnId) => ColumnView(columnDataTable[columnId].title, columnId))
      .join("")}   
</main>
`;
};

export default MainView;
