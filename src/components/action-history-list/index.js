import * as ActionHistoryItem from "../action-history-item/index.js";
import * as Alert from "../alert/index.js";
import todoStore from "../../store/todoStore.js";
import { removeEvent, setEvent } from "../../utils/handler.js";

export function template() {
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
        </ul>
        <div class="action-history__footer">
          <button
            class="button text-danger display-bold14"
            style="width: 104px"
            type="button">
            기록 전체 삭제
          </button>
        </div>
      </div>
    </dialog>
    `;
}

export function render(parent) {
  parent.insertAdjacentHTML("beforeend", template());

  const dialog = document.querySelector(".action-history-dialog");
  const dialogCloseBtn = dialog.querySelector(".action-history__close-button");
  const actionHistoryDeleteBtn = dialog.querySelector(
    ".action-history__footer > button"
  );

  // 이벤트 등록
  setEvent(dialogCloseBtn, "click", () => dialogCloseAnimation(dialog));
  setEvent(actionHistoryDeleteBtn, "click", removeAllActionHistory);
}

// dialog show
export function show() {
  const dialog = document.querySelector(".action-history-dialog");
  renderActionHistoryItems();
  dialog.showModal();
}

// dialog close animation
const dialogCloseAnimation = (dialog) => {
  dialog.classList.add("hide");

  // dialog 닫힐 시 hide 붙여줌 => 애니메이션 끝나면 dialog close
  const animationEndHandler = () => {
    dialog.classList.remove("hide");
    dialog.close();
    removeEvent(dialog, "animationend", animationEndHandler);
  };

  dialog.addEventListener("animationend", animationEndHandler);
};

// actionHistory 모두 삭제
export function removeAllActionHistory() {
  Alert.show({
    message: "모든 사용자 활동 기록을 삭제할까요?",
    onConfirm: () => {
      todoStore.dispatch({ type: "DELETE_ACTION_HISTORY" });
      Alert.close();
    },
  });
}

// render actionHistory items
function renderActionHistoryItems() {
  const historyItems = document.querySelector(".action-history__items");
  const actionHistory = todoStore.getState().actionHistory;

  // 기록이 없을 때 <-> 있을 때의 view 차이
  if (actionHistory.length === 0) {
    historyItems.innerHTML = emptyActionHistoryTemplate();
    actionHistoryFooterHidden(true);
  } else {
    historyItems.innerHTML = actionHistory
      .map((actionHistory) => ActionHistoryItem.template({ actionHistory }))
      .join("");
    actionHistoryFooterHidden(false);
  }
}

// actionHistory가 비어있을 시
const emptyActionHistoryTemplate = () => {
  return `
    <div class="action-history__none text-weak display-medium14">
      <p>사용자 활동 기록이 없습니다.</p>
    </div>
  `;
};

const actionHistoryFooterHidden = (isHidden) => {
  const deleteButton = document.querySelector(".action-history__footer");
  deleteButton.style.display = isHidden ? "none" : "flex";
};
