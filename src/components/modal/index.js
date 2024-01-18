import styles from "./modal.module.scss";

// props: detail....

export default function modal(parent, props) {
  parent.innerHTML = `
    <div todo-data="modalSection" class="${styles.modal}">
      <p class="${styles.modal__modalText}">${props.msg}</p>
      <div class="${styles.modal__bottomContainer}">
        <button todo-data="cancelBtn" class="${styles["modal__btn--inactive"]}">취소</button>
        <button todo-data="deleteBtn" class="${styles["modal__btn--active"]}">삭제</button>
      </div>
    </div>
  `;

  const modalSection = parent.querySelector('[todo-data="modalSection"]');
  modalSection.addEventListener("click", (e) => {
    //app/index.js에서 선언해준 modal전체 영역을 눌렀을 때, 모달이 꺼지는 함수를 방지
    e.stopPropagation();
  });

  const cancelBtn = parent.querySelector('[todo-data="cancelBtn"]');
  cancelBtn.addEventListener("click", () => {
    //밖에 클릭하면 나가는 함수를 취소 버튼에도 적용
    parent.click();
  });

  const deleteBtn = parent.querySelector('[todo-data="deleteBtn"]');
  deleteBtn.addEventListener("click", () => {
    parent.click();
    props.onDelete();
  });
}
