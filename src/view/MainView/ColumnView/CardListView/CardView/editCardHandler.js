import { store } from "../../../../../model/store.js";

export const editCardHandler = (target) => {
  const columnId = target.closest(".main__column").id;
  const cardId = target.closest("li").id;

  store.openEditForm(cardId, columnId);
};
