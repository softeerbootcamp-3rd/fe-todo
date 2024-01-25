import * as ActionHistoryItem from "../action-history-item/index.js";
import * as Alert from "../alert/index.js";
import todoStore from "../../store/todoStore.js";

export function template({ actionHistorys }) {
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
  // FIXME 초기 데이터 받아서 넣어주기

  parent.insertAdjacentHTML(
    "beforeend",
    template({ actionHistorys: todoStore.getState().actionHistory })
  );

  const dialog = document.querySelector(".action-history-dialog");

  dialog
    .querySelector(".action-history__close-button")
    .addEventListener("click", () => {
      dialog.classList.add("hide");

      // dialog 닫힐 시 hide 붙여줌 => 애니메이션 끝나면 dialog close
      const animationEndHandler = function () {
        console.log(dialog.classList);
        dialog.classList.remove("hide");
        dialog.close();
        dialog.removeEventListener("animationend", animationEndHandler, false);
      };

      dialog.addEventListener("animationend", animationEndHandler, false);
    });

  dialog
    .querySelector(".action-history__footer > button")
    .addEventListener("click", removeAllActionHistory);
}

export function renderActionHistoryItems() {
  const historyItems = document.querySelector(".action-history__items");
  const actionHistory = todoStore.getState().actionHistory;

  // 기록이 없을 때 <-> 있을 때의 view 차이
  if (actionHistory.length === 0) {
    historyItems.innerHTML = emptyActionHistoryItemTemplate();
    actionHistoryFooternHidden(true);
  } else {
    historyItems.innerHTML = actionHistory
      .map((actionHistory) => ActionHistoryItem.template({ actionHistory }))
      .join("");
    actionHistoryFooternHidden(false);
  }
}

const emptyActionHistoryItemTemplate = () => {
  return `
    <div class="action-history__none text-weak display-medium14">
      <p>사용자 활동 기록이 없습니다.</p>
    </div>
  `;
};

const actionHistoryFooternHidden = (isHidden) => {
  const deleteButton = document.querySelector(".action-history__footer");
  deleteButton.style.display = isHidden ? "none" : "flex";
};

export function show() {
  const dialog = document.querySelector(".action-history-dialog");
  renderActionHistoryItems();
  dialog.showModal();
}

export function updateActionHistory() {}

export function removeAllActionHistory() {
  Alert.show({
    message: "모든 사용자 활동 기록을 삭제할까요?",
    onConfirm: () => {
      todoStore.dispatch({ type: "DELETE_ACTION_HISTORY" });
      Alert.close();
    },
  });
}
