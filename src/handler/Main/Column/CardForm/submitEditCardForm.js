import { store } from "@/model/Store.js";
import { renderCardList } from "@/view/Main/Column/renderCardList.js";
import { renderListCount } from "@/view/Main/Column/renderListCount.js";
import { getHistoryTemplate } from "../../../../util/getHistoryTemplate";

const getNewHistory = (newCard) => {
  const { author, updatedAt: time, title: cardTitle } = newCard;
  const newHistory = {
    ...getHistoryTemplate(),
    author,
    time,
    cardTitle,
    type: "변경",
  };
  return newHistory;
};

const createCardData = (target) => {
  const formData = new FormData(target);
  formData.set("updatedAt", new Date());
  return Object.fromEntries(formData);
};

export const submitEditCardForm = async (target) => {
  const currentColumn = target.closest("section");
  const cardId = target.id.split("-")[1];
  const cardData = createCardData(target);
  const newCard = await store.editCardInServer(cardId, cardData);
  store.editCard(newCard);

  renderCardList(currentColumn);
  renderListCount(currentColumn);
  target.remove();

  const newHistory = getNewHistory(newCard);
  const historyData = await store.addHistoryToServer(newHistory);
  store.addHistory(historyData);
};
