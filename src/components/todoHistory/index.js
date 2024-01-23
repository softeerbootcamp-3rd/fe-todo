import styles from "./todoHistory.module.scss";
import closedIcon from "../../asset/img/closed.svg";
import todoHistoryItem from "../todoHistoryItem";
import { getHistory } from "../../utils/API/history";

export default function todoHistory(target, data) {
  const views = mount(target, data);
  attachHandlers(views, data);
}

function mount(target, data) {
  target.innerHTML = /*html*/ `
  <div class="${styles["todoHistory"]}">
    <div class="${styles.todoHistory__header}">
      <h2 class="${styles.todoHistory__title}">사용자 활동 기록</h2>
      <button data-node="historyCloseBtn" class="${styles.todoHistory__closedBtn}">
        <img class="${styles.todoHistory__closedIcon}" src="${closedIcon}"/>
        닫기
      </button>
    </div>
    <div data-node="history_list" class="${styles.todoHistory__historyList}">
    </div>
    <div class="${styles.todoHistory__footer}">
      <button data-node="historyClearBtn" class="${styles.todoHistory__clearBtn}">기록 전체 삭제</button>
    </div>
  </div>`;

  const historyList = target.querySelector('[data-node="history_list"]');
  const historyCloseBtn = target.querySelector('[data-node="historyCloseBtn"]');
  const historyClearBtn = target.querySelector('[data-node="historyClearBtn"]');
  return { target, historyList, historyCloseBtn, historyClearBtn };
}

function attachHandlers(
  { target, historyList, historyCloseBtn, historyClearBtn },
  data
) {
  historyCloseBtn.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("toggleHistoryList"));
  });

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
