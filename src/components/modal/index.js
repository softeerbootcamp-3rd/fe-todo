import styles from "./modal.module.scss";

// data: detail....

export default function modal(renderTarget, initialData) {
  const views = mount(renderTarget, initialData);
  attachHandlers(views, initialData);
}

function attachHandlers(
  { renderTarget, modalSection, cancelBtn, deleteBtn },
  initialData
) {
  const modalSectionClick = (e) => {
    //app/index.js에서 선언해준 modal전체 영역을 눌렀을 때, 모달이 꺼지는 함수를 방지
    e.stopPropagation();
  };

  const cancelBtnClick = () => {
    //밖에 클릭하면 나가는 함수를 취소 버튼에도 적용
    renderTarget.click();
  };

  const deleteBtnClick = () => {
    renderTarget.click();
    initialData.onDeleteBtnClicked();
  };

  modalSection.addEventListener("click", modalSectionClick);
  cancelBtn.addEventListener("click", cancelBtnClick);
  deleteBtn.addEventListener("click", deleteBtnClick);
}

function mount(renderTarget, initialData) {
  renderTarget.innerHTML = /*html*/ `
    <div data-node="modalSection" class="${styles.modal}">
      <p class="${styles.modal__modalText}">${initialData.msg}</p>
      <div class="${styles.modal__bottomContainer}">
        <button data-node="cancelBtn" class="${styles["modal__btn"]} ${styles["modal__btn--inactive"]}">취소</button>
        <button data-node="deleteBtn" class="${styles["modal__btn"]} ${styles["modal__btn--active"]}">삭제</button>
      </div>
    </div>
  `;

  const modalSection = renderTarget.querySelector('[data-node="modalSection"]');
  const cancelBtn = renderTarget.querySelector('[data-node="cancelBtn"]');
  const deleteBtn = renderTarget.querySelector('[data-node="deleteBtn"]');

  return { renderTarget, modalSection, cancelBtn, deleteBtn };
}
