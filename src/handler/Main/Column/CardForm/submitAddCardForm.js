import { store } from "@/model/Store.js";
import { getDeviceInfo } from "@/util/getDeviceInfo.js";
import { renderCardList } from "@/view/Main/Column/renderCardList.js";
import { renderListCount } from "@/view/Main/Column/renderListCount.js";

const createCardData = (target) => {
  const formData = new FormData(target);
  formData.set("author", getDeviceInfo());
  formData.set("createdAt", new Date());
  formData.set("cardId", store.cardId);
  return Object.fromEntries(formData);
};

export const submitAddCardForm = (target) => {
  const currentColumn = target.closest("section");
  const cardData = createCardData(target);
  // store.addCardToServer({ columnId: currentColumn.id, cardData });
  store.addCard({ columnId: currentColumn.id, cardData });
  store.setAddCardHistory(currentColumn.id);
  renderCardList(currentColumn);
  renderListCount(currentColumn);
  target.remove();
};
