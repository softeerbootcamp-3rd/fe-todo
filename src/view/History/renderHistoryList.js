import { HistoryListView } from "./HistoryListView";
import { store } from "@/model/Store";

export const renderHistoryList = () => {
  const historyList = document.querySelector(".history__list");
  historyList.remove();
  document
    .querySelector(".history__header")
    .insertAdjacentHTML("afterend", HistoryListView(store.historyData));
};
