import { store } from "../../model/Store";
import { renderHistoryList } from "../../view/History/renderHistoryList";

export const cancelDeleteHistory = () => {
  const modal = target.closest(".modal-backdrop");
  modal.remove();
};

export const deleteHistory = async (target) => {
  const deletedList = await store.deleteHistoryInServer();
  store.deleteHistory(deletedList);
  renderHistoryList();
};

export const clickDeleteHistory = () => {
  const app = document.querySelector("#app");
  app.insertAdjacentHTML(
    "afterbegin",
    deleteModalView("사용자 활동 기록을 모두 삭제할까요?", "deleteHistory")
  );
};
