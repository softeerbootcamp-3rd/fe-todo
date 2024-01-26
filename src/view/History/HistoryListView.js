import { HistoryCardView } from "./HistoryCard/HistoryCardView.js";

export const HistoryListView = (historyList) => {
  return `
      <ul class="history__list">
        ${
          historyList.length
            ? historyList.map((history) => HistoryCardView(history)).join("")
            : "<span class='history__list__text--empty'>사용자 활동 기록이 없습니다.</span>"
        }
      </ul>
    `;
};
