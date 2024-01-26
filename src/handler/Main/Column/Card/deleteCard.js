import { renderCardList } from "@/view/Main/Column/renderCardList.js";
import { renderListCount } from "@/view/Main/Column/renderListCount.js";
import { store } from "@/model/Store";
import { getHistoryTemplate } from "@/util/getHistoryTemplate";
import { deleteModalView } from "@/view/Main/Column/Card/deleteModal";
import { deleteCardInServer, addHistoryToServer } from "@/api/fetchServer";

const getNewHistory = (deletedCard) => {
  const { author, title: cardTitle } = deletedCard;
  const newHistory = {
    ...getHistoryTemplate(),
    author,
    time: new Date(),
    cardTitle,
    type: "삭제",
  };
  return newHistory;
};

export const cancelDeleteCard = (target) => {
  const modal = target.closest(".modal-backdrop");
  modal.remove();
};

let deleteTarget = null;

export const deleteCard = async (target) => {
  const currentColumn = deleteTarget.closest(".main__column");
  const cardId = deleteTarget.closest(".card").id;
  const deletedCard = store.cardData[cardId];
  const newHistory = getNewHistory(deletedCard);

  const newColumn = await deleteCardInServer(currentColumn.id, cardId);
  store.deleteCard(newColumn);
  renderCardList(currentColumn);
  renderListCount(currentColumn);
  cancelDeleteCard(target);
  const historyData = await addHistoryToServer(newHistory);
  store.addHistory(historyData);
};

export const clickDeleteCard = (target) => {
  const app = document.querySelector("#app");
  deleteTarget = target;
  app.insertAdjacentHTML("afterbegin", deleteModalView("선택한 카드를 삭제할까요?", "delete"));
};
