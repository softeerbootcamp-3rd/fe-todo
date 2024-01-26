import { store } from "@/model/Store";
import { renderHistoryList } from "@/view/History/renderHistoryList";
import { deleteHistoryInServer } from "@/api/fetchServer";

export const deleteHistory = async (target) => {
  const deletedList = await deleteHistoryInServer();
  store.deleteHistory(deletedList);
  renderHistoryList();
};
