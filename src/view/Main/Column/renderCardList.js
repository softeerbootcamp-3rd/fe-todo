import { cardDataTable, columnDataTable } from "../../../model/model";
import { CardListView } from "./CardListView";

export const renderCardList = (currentColumn) => {
  const oldCardList = currentColumn.querySelector(".card-list");
  oldCardList && oldCardList.remove();
  currentColumn.insertAdjacentHTML(
    "beforeend",
    CardListView({
      cardList: columnDataTable[currentColumn.id].value,
      columnId: currentColumn.id,
      cardDataTable,
    })
  );
};
