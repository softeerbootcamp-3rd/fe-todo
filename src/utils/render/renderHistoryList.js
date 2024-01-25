import todoHistoryItem from "../../components/todoHistoryItem";

export function renderHistoryList(historyArr) {
  const historyList = document.querySelector('[todo-data="history_list"]');
  const historyClearBtn = document.querySelector(
    '[todo-data="historyClearBtn"]'
  );
  if (historyList === null) return;
  if (historyArr.length === 0) {
    historyList.innerHTML =
      "<p class='grayBasicText_14'>사용자 활동 기록이 없습니다.</p>";
    historyClearBtn.style.display = "none";
    historyList.style.marginTop = "20px";
    historyList.style.marginBottom = "10px";
  } else {
    historyList.innerHTML = "";
    historyArr.forEach((history) => {
      const historyContainer = document.createElement("div");
      todoHistoryItem(historyContainer, history);
      historyList.appendChild(historyContainer);
      historyClearBtn.style.display = "block";
      historyList.style.marginTop = "0px";
      historyList.style.marginBottom = "0px";
    });
  }
}
