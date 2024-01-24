import { historyDataList } from "../../../../../model/model.js";
import { getDeviceInfo } from "../../../../../util/getDeviceInfo.js";
import { historyDataTemplate } from "../../../../../model/historyDataTemplate.js";
import { renderCardList, renderListCount } from "../../../../render.js";
import { store, createCard } from "../../../../../model/store.js";

let cardId = 3;

const createCardData = (target) => {
  const formData = new FormData(target);
  formData.set("author", getDeviceInfo());
  formData.set("createdAt", new Date());
  formData.set("cardId", cardId);
  return Object.fromEntries(formData);
};

const updateModel = ({ target, currentColumn }) => {
  const columnId = currentColumn.id;
  const card = {...createCardData(target), columnId};
  store.setCard(cardId, createCard(card));
};

// todo: make addHistoryCard util-fn
const addNewHistory = (currentColumn) => {
  const { author: username, title: cardTitle } = store.getCard(cardId++);
  const columnTitle = store.getColumnTitle(currentColumn.id);
  const newHistory = {
    ...historyDataTemplate(),
    username,
    time: new Date(),
    cardTitle,
    type: "등록",
    from: columnTitle,
  };
  historyDataList.unshift(newHistory);
};

export const submitAddCardFormHandler = (target) => {
  const currentColumn = target.closest("section");

  updateModel({ target, currentColumn });
  renderCardList(currentColumn);
  renderListCount(currentColumn);
  addNewHistory(currentColumn);

  target.remove();
};
