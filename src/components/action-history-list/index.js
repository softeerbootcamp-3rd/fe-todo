import { setEvent } from "../../utils/set-event.js";
import * as ActionHistoryItem from "../action-history-item/index.js";
import * as Alert from "../alert/index.js";
import * as history from "../../features/action-history/index.js";

const app = document.getElementById("app");

export function template({ history } = { history: [] }) {
  return `
    <dialog class="action-history-dialog rounded-16 shadow-floating">
      <div class="action-history__container">
      </div>
    </dialog>
    `;
}

export function render({ history }) {
  const actionHistoryContainer = document.querySelector(
    ".action-history__container"
  );

  actionHistoryContainer.innerHTML = `<div class="action-history__header">
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
          ${
            history.length === 0
              ? `<p class="text-weak display-medium14" style="text-align:center; padding:16px">사용자 활동 기록이 없습니다.</p>`
              : history
                  .map((item) => ActionHistoryItem.template({ history: item }))
                  .join("")
          }
        </ul>
        ${
          history.length === 0
            ? ""
            : `<div class='action-history__footer'>
              <button
                class='history-reset-button button text-danger display-bold14'
                style='width: 104px'
                type='button'
              >
                기록 전체 삭제
              </button>
            </div>`
        }`;
}

export function show() {
  const dialog = document.querySelector(".action-history-dialog");
  dialog.showModal();
}

setEvent(app, "click", (event) => {
  const dialogCloseButton = event.target.closest(
    ".action-history__close-button"
  );
  if (!dialogCloseButton) return;

  const dialog = document.querySelector(".action-history-dialog");
  dialog.close();
});

setEvent(app, "click", (event) => {
  const resetButton = event.target.closest(".history-reset-button");
  if (!resetButton) return;

  Alert.show({
    message: "모든 사용자 활동 기록을 삭제할까요?",
    onConfirm: async () => {
      await history.resetHistory({
        onChange: (state) => {
          render({ history: state.history });
        },
      });
      Alert.close();
    },
  });
});
