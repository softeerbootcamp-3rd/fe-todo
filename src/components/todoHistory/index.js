import styles from "./todoHistory.module.scss";
import closedIcon from "../../asset/img/closed.svg";
import todoHistoryItem from "../todoHistoryItem";
import { getHistory } from "../../utils/API/history";

export default function todoHistory(parent, data) {
  parent.innerHTML = template(data);
  controller(parent, data);
}

function template(data) {
  return `
  <div class="${styles["todoHistory"]}">
    <div class="${styles.todoHistory__header}">
      <h2 class="${styles.todoHistory__title}">사용자 활동 기록</h2>
      <button data-node="historyCloseBtn" class="${styles.todoHistory__closedBtn}">
        <img class="${styles.todoHistory__closedIcon}" src="${closedIcon}"></img>
        닫기
      </button>
    </div>
    <div data-node="history_list" class="${styles.todoHistory__historyList}">
    </div>
    <div class="${styles.todoHistory__footer}">
      <button data-node="historyClearBtn" class="${styles.todoHistory__clearBtn}">기록 전체 삭제</button>
    </div>
  </div>`;
}

function controller(parent, data) {
  const historyList = parent.querySelector('[data-node="history_list"]');
  const historyCloseBtn = parent.querySelector('[data-node="historyCloseBtn"]');
  historyCloseBtn.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("toggleHistoryList"));
  });

  const historyClearBtn = parent.querySelector('[data-node="historyClearBtn"]');
  historyClearBtn.addEventListener("click", () =>
    document.dispatchEvent(
      new CustomEvent("showDeleteModal", {
        detail: {
          msg: "모든 사용자 활동 기록을 삭제할까요?",
          onDelete: () => {
            //TODO: 사용자 활동 기록을 삭제할까요?
          },
        },
      })
    )
  );

  const historyArr = getHistory();
  historyArr.forEach((history) => {
    const container = document.createElement("div");
    todoHistoryItem(container, history);
    historyList.appendChild(container);
  });
}
