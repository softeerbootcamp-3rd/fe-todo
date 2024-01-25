import todoHistoryItem from "../todoHistoryItem";
import { moveAllHistory } from "../../utils/API/history";
import { todoHistoryTemplate } from "./template";
import { store } from "../../store/todoStore";

export default function todoHistory(parent, props) {
  parent.innerHTML = todoHistoryTemplate();

  const historyList = parent.querySelector('[todo-data="history_list"]');
  const historyCloseBtn = parent.querySelector('[todo-data="historyCloseBtn"]');
  historyCloseBtn.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("toggleHistoryList"));
  });

  const historyClearBtn = parent.querySelector('[todo-data="historyClearBtn"]');
  historyClearBtn.addEventListener("click", () => {
    document.dispatchEvent(
      new CustomEvent("showDeleteModal", {
        detail: {
          msg: "모든 사용자 활동 기록을 삭제할까요?",
          onDelete: () => {
            moveAllHistory();
            historyList.innerHTML = "";
          },
        },
      })
    );
  });

  const historyArr = store.getHistory();
  historyArr.forEach((history) => {
    const container = document.createElement("div");
    todoHistoryItem(container, history);
    historyList.appendChild(container);
  });
}
