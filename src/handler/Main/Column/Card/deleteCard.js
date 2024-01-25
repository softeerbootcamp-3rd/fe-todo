import { renderCardList } from "@/view/Main/Column/renderCardList.js";
import { renderListCount } from "@/view/Main/Column/renderListCount.js";
import { store } from "@/model/Store";
import { getHistoryTemplate } from "@/util/getHistoryTemplate";

const getNewHistory = (deletedCard) => {
  const { author, title: cardTitle } = deletedCard;
  const newHistory = {
    ...getHistoryTemplate(),
    author,
    time: Date.now(),
    cardTitle,
    type: "삭제",
  };
  return newHistory;
};

const deleteCard = async (target) => {
  const currentColumn = target.closest(".main__column");
  const cardId = target.closest(".card").id;
  const deletedCard = store.cardData[cardId];
  const newHistory = getNewHistory(deletedCard);

  const newColumn = await store.deleteCardInServer(currentColumn.id, cardId);
  store.deleteCard(newColumn);
  renderCardList(currentColumn);
  renderListCount(currentColumn);

  const historyData = await store.addHistoryToServer(newHistory);
  store.addHistory(historyData);
};

export const clickDeleteCard = (target) => {
  const confirmDelete = confirm("정말로 삭제하시겠습니까?");
  if (confirmDelete) {
    deleteCard(target);
  }
};
