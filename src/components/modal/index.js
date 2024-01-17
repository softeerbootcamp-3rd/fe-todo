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
    e.stopPropagation();
    //FIXME..
  });

  const cancelBtn = parent.querySelector('[todo-data="cancelBtn"]');
  cancelBtn.addEventListener("click", () => {
    parent.click();
  });

  const deleteBtn = parent.querySelector('[todo-data="deleteBtn"]');
  deleteBtn.addEventListener("click", () => {
    parent.click();
    props.onDelete();
  });
}
