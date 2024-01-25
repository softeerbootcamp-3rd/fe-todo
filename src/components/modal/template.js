import styles from "./modal.module.scss";

export function modalTemplate(props) {
  return `
    <div todo-section="modalSection" class="${styles.modal}">
      <p class="${styles.modal__modalText}">${props.msg}</p>
      <div class="${styles.modal__bottomContainer}">
        <button todo-data="cancelBtn" class="${styles["modal__btn"]} ${styles["modal__btn--inactive"]}">취소</button>
        <button todo-data="deleteBtn" class="${styles["modal__btn"]} ${styles["modal__btn--active"]}">삭제</button>
      </div>
    </div>
  `;
}
