import { columnDataTable } from "../../../model/model";
import { CardListView } from "./CardListView";

export const renderCardList = (currentColumn) => {
  const oldCardList = currentColumn.querySelector(".card-list");
  oldCardList.remove();
  currentColumn.insertAdjacentHTML(
    "beforeend",
    CardListView({ value: columnDataTable[currentColumn.id].value, columnId: currentColumn.id })
  );
};
