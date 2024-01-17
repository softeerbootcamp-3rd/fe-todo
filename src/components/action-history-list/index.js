import * as ActionHistoryItem from "../action-history-item/index.js";
import * as Alert from "../alert/index.js";

export function template(data) {
  return `
    <dialog class="action-history-dialog rounded-16 shadow-floating">
      <div class="action-history__container">
        <div class="action-history__header">
          <span class="text-strong display-bold16">사용자 활동 기록</span>
          <button
            class="action-history__close-button text-default display-bold14"
            type="button"
          >
            <img
              src="./assets/icons/close.svg"
              width="16"
              height="16"
              alt="닫기"
            />
            닫기
          </button>
        </div>
        <ul class="action-history__items">
          ${data.map((item) => ActionHistoryItem.template()).join("")}
        </ul>
        <div class="action-history__footer">
          <button
            class="button text-danger display-bold14"
            style="width: 104px"
            type="button"
          >
            기록 전체 삭제
          </button>
        </div>
      </div>
    </dialog>
    `;
}

export function render(parent) {
  // FIXME 초기 데이터 받아서 넣어주기
  parent.insertAdjacentHTML("beforeend", template([1, 2, 3]));

  const dialog = document.querySelector(".action-history-dialog");

  document
    .querySelector(".action-history__close-button")
    .addEventListener("click", () => {
      dialog.close();
    });

  document
    .querySelector(".action-history__footer > button")
    .addEventListener("click", removeAllActionHistory);
}
export function show() {
  const dialog = document.querySelector(".action-history-dialog");
  dialog.showModal();
}

export function updateActionHistory() {}

export function removeAllActionHistory() {
  Alert.show();
}
