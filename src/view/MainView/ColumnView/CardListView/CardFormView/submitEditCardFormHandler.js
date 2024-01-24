import { historyDataTemplate } from "../../../../../model/historyDataTemplate.js";
import { renderCardList, renderListCount } from "../../../../render.js";
import { createCard, store } from "../../../../../model/store.js";

const createCardData = (target) => {
  const formData = new FormData(target);
  formData.set("updatedAt", new Date());
  return Object.fromEntries(formData);
};

const updateModel = ({ target, cardId }) => {
  let oldCardData = store.getCard(cardId);
  let newCardData = createCardData(target);
  store.editCard(cardId, newCardData);
};

// todo: make addHistoryCard util-fn
const addNewHistory = (cardId) => {
  const card = store.getCard(cardId);
  const newHistory = {
    ...historyDataTemplate(),
    username: card.getAuthor(),
    time: new Date(),
    cardTitle: card.getTitle(),
    type: "변경",
  };
  store.setHistory(newHistory);
};

export const submitEditCardFormHandler = (target) => {
  const currentColumn = target.closest("section");
  const cardId = target.id.split("-")[1];
  updateModel({ target, cardId });
  renderCardList(currentColumn);
  renderListCount(currentColumn);
  addNewHistory(cardId);

  target.remove();
};
