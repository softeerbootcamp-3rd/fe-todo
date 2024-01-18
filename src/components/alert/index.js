export function template(data) {
  return `
    <dialog class="alert-dialog rounded-8 shadow-up">
        <div class="alert">
        <p class="alert__message text-default display-medium16">
            모든 사용자 활동 기록을 삭제할까요?
        </p>
        <div class="alert__control">
            <button
            class="button surface-alt display-bold14 text-default rounded-8"
            >
            취소
            </button>
            <button
            class="button surface-danger display-bold14 text-white-default rounded-8"
            >
            삭제
            </button>
        </div>
        </div>
    </dialog>
    `;
}

export function render(parent) {
  parent.insertAdjacentHTML("beforeend", template());
}

export function show() {
  const dialog = document.querySelector(".alert-dialog");
  dialog.showModal();
}
