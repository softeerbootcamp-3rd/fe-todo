import { store } from "../model/store.js";
import { HistoryListView } from "./HistoryView/HistoryView.js";
import { CardListView } from "../view/MainView/ColumnView/CardListView/CardListView.js";
import { ColumnTitleView, ColumnCountView } from "./MainView/ColumnView/ColumnView.js";
import { columnIdToCardList, columnIdToIdx } from "../model/helper.js";

export const historyListRender = () => {
  const historyList = document.querySelector(".history__list");
  const historyEmptyList = document.querySelector(".history__list--empty");
  const historyDeleteBtn = document.querySelector(".history__delete-all-btn");
  historyList?.remove();
  historyEmptyList?.remove();
  historyDeleteBtn?.remove();
  document.querySelector(".history__header").insertAdjacentHTML("afterend", HistoryListView());
};

export const renderCardList = (currentColumn) => {
  const oldCardList = currentColumn.querySelector(".card-list");
  oldCardList.remove();
  currentColumn.insertAdjacentHTML("beforeend", CardListView(columnIdToCardList(currentColumn.id), columnIdToIdx(currentColumn.id)));
};

export const renderListTitle = (currentColumn) => {
  const columnNav = currentColumn.querySelector(".column__nav__info");
  columnNav.querySelector(".column__nav__info__title")?.remove();
  columnNav.insertAdjacentHTML("afterbegin", ColumnTitleView(store.getColumnTitle(currentColumn.id)));
}

export const renderListCount = (currentColumn) => {
  const columnNav = currentColumn.querySelector(".column__nav__info");
  columnNav.querySelector(".column__nav__info__count")?.remove();
  columnNav.insertAdjacentHTML("beforeend", ColumnCountView(store.getColumnLength(currentColumn.id)));
};
