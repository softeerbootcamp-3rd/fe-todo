import { store } from "../../../model/store.js";


export const addCardHandler = (target) => {
  const currentColumnId = target.closest(".main__column").id;

  store.openAddForm(currentColumnId);
};
