import { store } from "../../model/Store";
import { renderHistoryList } from "../../view/History/renderHistoryList";

export const deleteHistory = async (target) => {
  const deletedList = await store.deleteHistoryInServer();
  store.deleteHistory(deletedList);
  renderHistoryList();
};
