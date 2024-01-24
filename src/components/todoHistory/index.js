import styles from "./todoHistory.module.scss";
import closedIcon from "../../asset/img/closed.svg";
import todoHistoryItem from "../todoHistoryItem";
import { getHistory } from "../../utils/API/history";

export default function todoHistory(renderTarget, initialData) {
  const views = mount(renderTarget, initialData);
  attachHandlers(views, initialData);
}

function attachHandlers(
  { renderTarget, historyList, historyCloseBtn, historyClearBtn },
  initialData
) {
  const historyCloseBtnClick = () => {
    document.dispatchEvent(new CustomEvent("toggleHistoryList"));
  };

  const historyClearBtnClick = () => {
    document.dispatchEvent(
      new CustomEvent("showDeleteModal", {
        detail: {
          msg: "모든 사용자 활동 기록을 삭제할까요?",
          onDelete: () => {
            //TODO: 사용자 활동 기록을 삭제할까요?
          },
        },
      })
    );
  };

  const historyArr = getHistory();
  let historyDestroyers = [];
  historyArr.forEach((history) => {
    const container = document.createElement("div");
    historyDestroyers.push(todoHistoryItem(container, history));
    historyList.appendChild(container);
  });

  historyCloseBtn.addEventListener("click", historyCloseBtnClick);
  historyClearBtn.addEventListener("click", historyClearBtnClick);
}

function mount(renderTarget, initialData) {
  renderTarget.innerHTML = /*html*/ `
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

  const historyList = renderTarget.querySelector('[data-node="history_list"]');
  const historyCloseBtn = renderTarget.querySelector(
    '[data-node="historyCloseBtn"]'
  );
  const historyClearBtn = renderTarget.querySelector(
    '[data-node="historyClearBtn"]'
  );
  return {
    renderTarget,
    historyList,
    historyCloseBtn,
    historyClearBtn,
  };
}
