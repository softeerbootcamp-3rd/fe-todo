export function template() {
  return `
    <dialog class="alert-dialog rounded-8 shadow-up">
        <div class="alert">
        <p class="alert__message text-default display-medium16">
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
  const dialog = document.querySelector(".alert-dialog");
  dialog.querySelector(".alert__message").innerText = message;

  dialog.showModal();

  dialog.querySelector(".cancel-button").addEventListener("click", () => {
    dialog.close();
  });

  // NOTE: addEventListener를 사용하지 않은 이유
  // show함수를 호출할 때 클릭 이벤트 핸들러를 "하나만" 설정하기 위해서
  // 삭제 버튼(.conform-button)을 클릭할 때만 이벤트 핸들러를 설정함
  dialog.querySelector(".confirm-button").onclick = onConfirm;
}

export function close() {
  const dialog = document.querySelector(".alert-dialog");
  dialog.close();
}
