import { store } from "@/model/Store.js";
import { renderCardList } from "../../../../view/Main/Column/renderCardList.js";
import { renderListCount } from "../../../../view/Main/Column/renderListCount.js";

const createCardData = (target) => {
  const formData = new FormData(target);
  formData.set("updatedAt", new Date());
  return Object.fromEntries(formData);
};

export const submitEditCardForm = (target) => {
  const currentColumn = target.closest("section");
  const cardId = target.id.split("-")[1];
  const cardData = createCardData(target);
  store.editCard({ cardData, cardId });
  store.setEditCardHistory(cardId);
  renderCardList(currentColumn);
  renderListCount(currentColumn);
  target.remove();
};
