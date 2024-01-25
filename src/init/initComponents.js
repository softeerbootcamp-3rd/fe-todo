import { store } from "../model/Store.js";
import { renderCardList } from "../view/Main/Column/renderCardList.js";
import { renderListCount } from "../view/Main/Column/renderListCount.js";

export const initComponents = () => {
  Object.keys(store.columnData).forEach((columnId) => {
    const currentColumn = document.querySelector(`#${columnId}`);
    renderCardList(currentColumn);
    renderListCount(currentColumn);
  });
};
