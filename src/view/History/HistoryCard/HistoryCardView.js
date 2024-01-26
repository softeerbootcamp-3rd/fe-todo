import { getElapsedTime } from "../../../util/getElapsedTime";

const AddView = (history) => {
  return `      
<strong>${history.cardTitle}</strong>을(를) <strong>${history.from}</strong>에
<strong>${history.type}</strong>하였습니다.
  `;
};

const EditView = (history) => {
  return `      
<strong>${history.cardTitle}</strong>을(를) <strong>${history.type}</strong>하였습니다.
  `;
};

const DeleteView = (history) => {
  return `      
<strong>${history.cardTitle}</strong>을(를) <strong>${history.type}</strong>하였습니다.
  `;
};

const MoveView = (history) => {
  return `      
<strong>${history.cardTitle}</strong>을(를) <strong>${history.from}</strong>에서
<strong>${history.to}</strong>으로 <strong>${history.type}</strong>하였습니다.
  `;
};

const historyCardMap = {
  등록: AddView,
  변경: EditView,
  삭제: DeleteView,
  이동: MoveView,
};

const getHistoryContents = (history) => {
  const historyFunction = historyCardMap[history.type];
  return historyFunction ? historyFunction(history) : null;
};

export const HistoryCardView = (history) => {
  return `
<li class="history-card">
  <img src="/assets/frog.svg" alt="profile" class="history-card__profile" />
  <section class="history-card__main">
    <h5 class="history-card__username">@${history.author}</h5>
    <p class="history-card__content">
      ${getHistoryContents(history)}
    </p>
    <footer class="history-card__time">${getElapsedTime(history.time)}</footer>
  </section>
</li>
      `;
};
