import { renderHistoryList } from "../../view/History/renderHistoryList";

export const showHistory = () => {
  renderHistoryList();
  document.querySelector(".history").showModal();
};
