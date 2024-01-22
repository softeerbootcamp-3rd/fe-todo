import { cardDataTable, columnDataTable, historyDataList } from "../../../../model/model.js";
import { getDeviceInfo } from "../../../../util/getDeviceInfo.js";
import { historyDataTemplate } from "../../../../util/historyDataTemplate.js";
import { renderCardList } from "../../../../view/Main/Column/renderCardList.js";
import { renderListCount } from "../../../../view/Main/Column/renderListCount.js";

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
  columnDataTable[columnId].value.unshift(cardId + "");
  cardDataTable[cardId] = createCardData(target);
};

// todo: make addHistoryCard util-fn
const addNewHistory = (currentColumn) => {
  const { author: username, createdAt: time, title: cardTitle } = cardDataTable[cardId++];
  const columnTitle = columnDataTable[currentColumn.id].title;
  const newHistory = {
    ...historyDataTemplate(),
    username,
    time,
    cardTitle,
    type: "등록",
    from: columnTitle,
  };
  historyDataList.unshift(newHistory);
};

export const submitAddCardForm = (target) => {
  const currentColumn = target.closest("section");

  updateModel({ target, currentColumn });
  renderCardList(currentColumn);
  renderListCount(currentColumn);
  addNewHistory(currentColumn);

  target.remove();
};
