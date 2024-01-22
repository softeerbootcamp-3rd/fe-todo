import { historyDataList } from "../../model/model";
import { HistoryListView } from "./HistoryListView";

export const renderHistoryList = () => {
  const historyList = document.querySelector(".history__list");
  historyList.remove();
  document
    .querySelector(".history__header")
    .insertAdjacentHTML("afterend", HistoryListView(historyDataList));
};
