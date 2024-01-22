import styles from "./todoHistory.module.scss";
import closedIcon from "../../asset/img/closed.svg";

export function todoHistoryTemplate(props) {
  return `
    <div class="${styles["todoHistory"]}">
      <div class="${styles.todoHistory__header}">
          <h2 class="${styles.todoHistory__title}">사용자 활동 기록</h2>
          <button todo-data="historyCloseBtn" class="${styles.todoHistory__closedBtn}">
              <img class="${styles.todoHistory__closedIcon}" src="${closedIcon}"></img>
              닫기
          </button>
      </div>
      <div todo-data="history_list" class="${styles.todoHistory__historyList}">
      </div>
      <div class="${styles.todoHistory__footer}">
          <button todo-data="historyClearBtn" class="${styles.todoHistory__clearBtn}">기록 전체 삭제</button>
      </div>
    </div>`;
}
