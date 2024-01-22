import { historyDataList } from "../../model/model.js";
import { HistoryCardView } from "./HistoryCardView/HistoryCardView.js";

export const HistoryView = () => {
  return `
    <dialog class="js-closeHistory history" id='history'>
    <div class="history__wrapper">
    <header class="history__header">
      <h3 class="history__header__title">사용자 활동 기록</h3>
      <button class="js-closeHistory history__header__close">
        <img class="js-closeHistory" src="/assets/close.svg" alt="close" />
        <p class="js-closeHistory">닫기</p>
      </button>
    </header>
      ${HistoryListView()}
      ${HistoryPurgeBtnView()}
    </div>
  </dialog>
    `;
};

export const HistoryListView = () => {
  if(historyDataList.length === 0) {
    return `
    <section class='history__list--empty'>
      <p>사용자 활동 기록이 없습니다.</p>
    </section>
    `
  }
  else{
    return `
      <ul class="history__list">
        ${historyDataList.map((history) => HistoryCardView(history)).join("")}
      </ul>
    `;
  }
};


export const HistoryPurgeBtnView = () => 
{
  return historyDataList.length === 0 ? '' : '<button class="js-deleteHistory history__delete-all-btn">기록 전체 삭제</button>'
}