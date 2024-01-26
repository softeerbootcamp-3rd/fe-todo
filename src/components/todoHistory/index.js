import todoHistoryItem from "../todoHistoryItem";
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
            store.dispatch({
              type: "deleteAllHistory",
            });
          },
        },
      })
    );
  });

  const historyArr = store.getHistory();
  if (historyArr.length === 0) {
    historyList.innerHTML =
      "<p class='grayBasicText_14'>사용자 활동 기록이 없습니다.</p>";
    historyClearBtn.style.display = "none";
    historyList.style.marginTop = "20px";
    historyList.style.marginBottom = "10px";
  } else {
    historyArr.forEach((history) => {
      const container = document.createElement("div");
      todoHistoryItem(container, history);
      historyList.appendChild(container);
      historyClearBtn.style.display = "block";
      historyList.style.marginTop = "0px";
      historyList.style.marginBottom = "0px";
    });
  }
}
