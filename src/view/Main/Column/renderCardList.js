import { CardListView } from "./CardListView";
import { store } from "@/model/Store";

export const renderCardList = (currentColumn) => {
  const oldCardList = currentColumn.querySelector(".card-list");
  oldCardList?.remove();
  currentColumn.insertAdjacentHTML(
    "beforeend",
    CardListView({
      cardList: store.columnData[currentColumn.id].value,
      columnId: currentColumn.id,
      cardDataTable: store.cardData,
    })
  );
};
