import * as ActionHistoryListDialog from "../action-history-list/index.js";
import { setEvent } from "../../utils/set-event.js";

// FIXME app 전역에 하나 만들어두고 참조하게 할 수는 없을까?
const app = document.getElementById("app");

export function template() {
  return `      
    <header class="header surface-alt">
        <h1 class="logo text-strong">TODOLIST</h1>
        <button class="action-history-open-button" type="button">
            <img alt="사용기록" src="./assets/icons/history.svg" width='24' height='24' />
        </button>
    </header>
  `;
}

setEvent(app, "click", (event) => {
  const target = event.target.closest(".action-history-open-button");
  if (!target) return;

  ActionHistoryListDialog.show();
});
