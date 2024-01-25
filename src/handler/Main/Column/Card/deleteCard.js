import { renderCardList } from "@/view/Main/Column/renderCardList.js";
import { renderListCount } from "@/view/Main/Column/renderListCount.js";
import { store } from "@/model/Store";
import { getHistoryTemplate } from "@/util/getHistoryTemplate";

const getNewHistory = (cardId) => {
  const { author: username, title: cardTitle } = store.cardData[cardId];
  const newHistory = {
    ...getHistoryTemplate(),
    username,
    time: Date.now(),
    cardTitle,
    type: "삭제",
  };
  return newHistory;
};

const deleteCard = (target) => {
  const currentColumn = target.closest(".main__column");
  const cardId = target.closest(".card").id;
  const newHistory = getNewHistory(cardId);
  store.addHistory(newHistory);
  store.deleteCard({ columnId: currentColumn.id, cardId });
  renderCardList(currentColumn);
  renderListCount(currentColumn);
};

export const clickDeleteCard = (target) => {
  const confirmDelete = confirm("정말로 삭제하시겠습니까?");
  if (confirmDelete) {
    deleteCard(target);
  }
};
