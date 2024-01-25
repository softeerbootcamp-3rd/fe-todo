import { HistoryListView } from "./HistoryListView.js";

export const HistoryView = () => {
  return `
  <div class="history__wrapper">
    <header class="history__header">
      <h3 class="history__header__title">사용자 활동 기록</h3>
      <button class="js-closeHistory history__header__close">
        <img class="js-closeHistory" src="/assets/close.svg" alt="close" />
        <p class="js-closeHistory">닫기</p>
      </button>
    </header>
      ${HistoryListView([])}
    <button class="js-deleteHistory history__delete-all-btn">기록 전체 삭제</button>
    </div>
    `;
};
