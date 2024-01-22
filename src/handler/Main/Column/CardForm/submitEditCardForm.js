import { cardDataTable, historyDataList } from "../../../../model/model.js";
import { historyDataTemplate } from "../../../../util/historyDataTemplate.js";
import { renderCardList, renderListCount } from "../../../../util/render.js";

const createCardData = (target) => {
  const formData = new FormData(target);
  formData.set("updatedAt", new Date());
  return Object.fromEntries(formData);
};

const updateModel = ({ target, cardId }) => {
  let oldCardData = cardDataTable[cardId];
  let newCardData = createCardData(target);
  cardDataTable[cardId] = { ...oldCardData, ...newCardData };
};

// todo: make addHistoryCard util-fn
const addNewHistory = (cardId) => {
  const { author: username, updatedAt: time, title: cardTitle } = cardDataTable[cardId];
  const newHistory = {
    ...historyDataTemplate(),
    username,
    time,
    cardTitle,
    type: "변경",
  };
  historyDataList.unshift(newHistory);
};

export const submitEditCardForm = (target) => {
  const currentColumn = target.closest("section");
  const cardId = target.id.split("-")[1];
  updateModel({ target, cardId });
  renderCardList(currentColumn);
  renderListCount(currentColumn);
  addNewHistory(cardId);

  target.remove();
};
