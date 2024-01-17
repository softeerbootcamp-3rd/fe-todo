import { cardData, columnList, historyData } from "../model/model.js";
import { historyDataTemplate } from "../util/historyDataTemplate.js";
import { CardView } from "../view/components/CardView.js";
import { HistoryCardView } from "../view/components/HistoryCardView.js";

let cardId = 3;

const updateCardData = (target) => {
  const formData = new FormData(target);
  formData.set("author", "web");
  formData.set("createdAt", Date.now()); //Todo - Real-time!!
  formData.set("cardId", cardId);
  cardData[cardId] = Object.fromEntries(formData);
};

const updateColumnList = (currentColumn) => {
  const columnId = currentColumn.id;
  columnList[columnId].value.push(cardId);
};

const insertNewCard = (target) => {
  target.insertAdjacentHTML("afterend", CardView(cardId));
};

const updateListCount = (currentColumn) => {
  const count = currentColumn.querySelector(".column__nav__info__count");
  count.textContent++;
};

// todo: make addHistoryCard util-fn
const addHistoryCard = (currentColumn) => {
  const historyList = document.querySelector(".history__list");
  const { author: username, createdAt: time, title: cardTitle } = cardData[cardId++];
  const columnId = currentColumn.id;
  const columnTitle = columnList[columnId].title;
  const historyData = {
    ...historyDataTemplate(),
    username,
    time,
    cardTitle,
    type: "등록",
    from: columnTitle,
  };
  historyList.insertAdjacentHTML("afterbegin", HistoryCardView(historyData));
};

export const submitAddCardFormHandler = (target) => {
  const currentColumn = target.closest("section");

  updateCardData(target);
  updateColumnList(currentColumn);
  insertNewCard(target);
  updateListCount(currentColumn);
  addHistoryCard(currentColumn);

  target.remove();
};
