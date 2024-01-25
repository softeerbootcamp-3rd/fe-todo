import todoHistoryItem from "../../components/todoHistoryItem";

export function renderHistoryList(historyArr) {
  const historyList = document.querySelector('[todo-data="history_list"]');
  if (historyList === null) return;
  historyList.innerHTML = "";
  historyArr.forEach((history) => {
    const historyContainer = document.createElement("div");

    todoHistoryItem(historyContainer, history);
    historyList.appendChild(historyContainer);
  });
}
