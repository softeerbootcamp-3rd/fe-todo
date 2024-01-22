import styles from "./modal.module.scss";

// data: detail....

export default function modal(target, data) {
  target.innerHTML = `
    <div data-node="modalSection" class="${styles.modal}">
      <p class="${styles.modal__modalText}">${data.msg}</p>
      <div class="${styles.modal__bottomContainer}">
        <button data-node="cancelBtn" class="${styles["modal__btn"]} ${styles["modal__btn--inactive"]}">취소</button>
        <button data-node="deleteBtn" class="${styles["modal__btn"]} ${styles["modal__btn--active"]}">삭제</button>
      </div>
    </div>
  `;

  const modalSection = target.querySelector('[data-node="modalSection"]');
  modalSection.addEventListener("click", (e) => {
    //app/index.js에서 선언해준 modal전체 영역을 눌렀을 때, 모달이 꺼지는 함수를 방지
    e.stopPropagation();
  });

  const cancelBtn = target.querySelector('[data-node="cancelBtn"]');
  cancelBtn.addEventListener("click", () => {
    //밖에 클릭하면 나가는 함수를 취소 버튼에도 적용
    target.click();
  });

  const deleteBtn = target.querySelector('[data-node="deleteBtn"]');
  deleteBtn.addEventListener("click", () => {
    target.click();
    data.onDelete();
  });
}
