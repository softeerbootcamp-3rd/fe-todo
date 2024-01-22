import { historyDataList } from "../../model/model.js";
import { HistoryCardView } from "./components/HistoryCardView.js";

export const HistoryView = () => {
  return `
    <dialog class="js-closeHistory history">
    <div class="history__wrapper">
    <header class="history__header">
      <h3 class="history__header__title">사용자 활동 기록</h3>
      <button class="js-closeHistory history__header__close">
        <img class="js-closeHistory" src="/assets/close.svg" alt="close" />
        <p class="js-closeHistory">닫기</p>
      </button>
    </header>
      ${HistoryListView()}
    <button class="history__delete-all-btn">기록 전체 삭제</button>
    </div>
  </dialog>
    `;
};

export const HistoryListView = () => {
  return `
    <ul class="history__list">
      ${historyDataList.map((history) => HistoryCardView(history)).join("")}
    </ul>
  `;
};
