export function template({ message }) {
  return `
    <dialog class="alert-dialog rounded-8 shadow-up">
        <div class="alert">
        <p class="alert__message text-default display-medium16">
          ${message}
        </p>
        <div class="alert__control">
            <button
              class="cancel-button button surface-alt display-bold14 text-default rounded-8"
            >
              취소
            </button>
            <button
              class="confirm-button button surface-danger display-bold14 text-white-default rounded-8"
            >
              삭제
            </button>
        </div>
        </div>
    </dialog>
    `;
}

export function show({ message, onConfirm }) {
  document
    .querySelector("#app")
    .insertAdjacentHTML("beforeend", template({ message }));
  const dialog = document.querySelector(".alert-dialog");
  dialog.showModal();

  dialog.querySelector(".cancel-button").addEventListener("click", () => {
    dialog.close();
  });
  dialog.querySelector(".confirm-button").addEventListener("click", onConfirm);
}

export function close() {
  const dialog = document.querySelector(".alert-dialog");
  dialog.close();
}
