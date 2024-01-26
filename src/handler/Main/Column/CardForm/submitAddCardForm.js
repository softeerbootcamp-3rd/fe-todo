import { store } from "@/model/Store.js";
import { getDeviceInfo } from "@/util/getDeviceInfo.js";
import { renderCardList } from "@/view/Main/Column/renderCardList.js";
import { renderListCount } from "@/view/Main/Column/renderListCount.js";
import { getHistoryTemplate } from "@/util/getHistoryTemplate";

const getNewHistory = ({ columnTitle, card }) => {
  const { author, createdAt: time, title: cardTitle } = card;
  const newHistory = {
    ...getHistoryTemplate(),
    author,
    time,
    cardTitle,
    type: "등록",
    from: columnTitle,
  };
  return newHistory;
};

const createCardData = (target) => {
  const formData = new FormData(target);
  formData.set("author", getDeviceInfo());
  formData.set("createdAt", new Date());
  formData.set("cardId", store.cardId);
  return Object.fromEntries(formData);
};

export const submitAddCardForm = async (target) => {
  const currentColumn = target.closest("section");
  const cardData = createCardData(target);
  const { newCard, newColumn } = await store.addCardToServer({
    columnId: currentColumn.id,
    cardData,
  });

  store.addCard({ column: newColumn, card: newCard });

  renderCardList(currentColumn);
  renderListCount(currentColumn);
  target.remove();

  const newHistory = getNewHistory({ columnTitle: newColumn.title, card: newCard });
  const historyData = await store.addHistoryToServer(newHistory);
  store.addHistory(historyData);
};
