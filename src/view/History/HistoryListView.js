import HistoryCardView from "./Card/index.js";

export const HistoryListView = (historyList) => {
  return `
      <ul class="history__list">
        ${historyList.map((history) => HistoryCardView(history)).join("")}
      </ul>
    `;
};
