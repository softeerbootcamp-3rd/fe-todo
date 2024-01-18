const HistoryCardAddView = (history) => {
  return `
        <p class="history-card__content">
        <strong>${history.cardTitle}</strong>을(를) <strong>${history.from}</strong>에
        <strong>${history.type}</strong>하였습니다.
      </p>
        `;
};

const HistoryCardEditView = (history) => {
  return `
        <p class="history-card__content">
        <strong>${history.cardTitle}</strong>을(를) <strong>${history.type}</strong>하였습니다.
      </p>
        `;
};

const HistoryCardDeleteView = (history) => {
  return `
        <p class="history-card__content">
        <strong>${history.cardTitle}</strong>을(를) <strong>${history.type}</strong>하였습니다.
      </p>
        `;
};

const HistoryCardMoveView = (history) => {
  return `
        <p class="history-card__content">
        <strong>${history.cardTitle}</strong>을(를) <strong>${history.from}</strong>에서
        <strong>${history.to}</strong>으로 <strong>${history.type}</strong>하였습니다.
      </p>
        `;
};

const historyCardMap = {
  등록: HistoryCardAddView,
  변경: HistoryCardEditView,
  삭제: HistoryCardDeleteView,
  이동: HistoryCardMoveView,
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
        <h5 class="history-card__username">@${history.username}</h5>
          ${getHistoryContents(history)}
        <footer class="history-card__time">${history.time}</footer>
      </section>
    </li>
      `;
};
