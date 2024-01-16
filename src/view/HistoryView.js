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
      <li class="history-card">
        <img src="/assets/frog.svg" alt="profile" class="history-card__profile" />
        <section class="history-card__main">
          <h5 class="history-card__username">@멋진삼</h5>
          <p class="history-card__content">
            <strong>HTML/CSS 공부하기</strong>을(를) <strong>해야할 일</strong>에서
            <strong>하고있는 일</strong>으로 <strong>이동</strong>하였습니다.
          </p>
          <footer class="history-card__time">18분 전</footer>
        </section>
      </li>
    </ul>
    <button class="history__delete-all-btn">기록 전체 삭제</button>
  </dialog>
    `;
};
