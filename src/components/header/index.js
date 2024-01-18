// import { actionHistoryListDialog } from "../action-history-list/index.js";
import * as ActionHistoryListDialog from "../action-history-list/index.js";

export function template() {
  return `      
    <header class="header surface-alt">
        <h1 class="logo text-strong">TODOLIST</h1>
        <button class="action-history-open-button" type="button">
            <img alt="사용기록" src="./assets/icons/history.svg" />
        </button>
    </header>
  `;
}

export function render(parent) {
  parent.insertAdjacentHTML("afterbegin", template());
}

// FIXME 이벤트 위임이 괜찮은가?
document.querySelector("#app").onclick = (e) => {
  const target = e.target.closest("button");
  if (target && target.classList.contains("action-history-open-button")) {
    ActionHistoryListDialog.show();
  }
};
