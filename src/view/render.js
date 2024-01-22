import { columnDataTable } from "../model/model.js";
import { HistoryListView, HistoryPurgeBtnView } from "./HistoryView/HistoryView.js";
import { CardListView } from "../view/MainView/ColumnView/CardListView/CardListView.js";

export const historyListRender = () => {
  const historyList = document.querySelector(".history__list");
  const historyEmptyList = document.querySelector(".history__list--empty");
  const historyDeleteBtn = document.querySelector(".history__delete-all-btn");
  historyList?.remove();
  historyEmptyList?.remove();
  historyDeleteBtn?.remove();
  document.querySelector(".history__header").insertAdjacentHTML("afterend", HistoryListView());
  document.querySelector(".history__list")?.insertAdjacentHTML("afterend", HistoryPurgeBtnView());
};

export const renderCardList = (currentColumn) => {
  const oldCardList = currentColumn.querySelector(".card-list");
  oldCardList.remove();
  currentColumn.insertAdjacentHTML("beforeend", CardListView(currentColumn.id));
};

export const renderListCount = (currentColumn) => {
  const countElement = currentColumn.querySelector(".column__nav__info__count");
  const count = columnDataTable[currentColumn.id].value.length;
  countElement.textContent = count;
};
