import { historyData } from "../model/model.js";
import { HistoryCardView } from "./components/HistoryCardView.js";

export const HistoryView = () => {
  return `
    <dialog open class="history">
    <header class="history__header">
      <h3 class="history__header__title">사용자 활동 기록</h3>
      <button class="history__header__close">
        <img src="/assets/close.svg" alt="close" />
        <p>닫기</p>
      </button>
    </header>
    <ul class="history__list">
        ${historyData.map((history) => HistoryCardView(history))}
    </ul>
    <button class="history__delete-all-btn">기록 전체 삭제</button>
  </dialog>
    `;
};
