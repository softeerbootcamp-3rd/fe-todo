const HistoryCardAddView = (history) => {
  return `
        <p class="history-card__content">
        <strong>${history.cardTitle}</strong>을(를) <strong>${history.from}</strong>에서
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

const getHistoryContents = (history) => {
  switch (history.type) {
    case "등록":
      return HistoryCardAddView(history);
    case "변경":
      return HistoryCardEditView(history);
    case "삭제":
      return HistoryCardDeleteView(history);
    case "이동":
      return HistoryCardMoveView(history);
    default:
      return null;
  }
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
