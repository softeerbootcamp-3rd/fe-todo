import { initEventListener } from "./init/initEventListener.js";
import { columnDataTable } from "./model/model.js";
import HeaderView from "./view/Header/index.js";
import HistoryView from "./view/History";
import { renderCardList } from "./view/Main/Column/renderCardList.js";
import { renderListCount } from "./view/Main/Column/renderListCount.js";
import MainView from "./view/Main/index.js";

(function init() {
  const app = document.getElementById("app");

  app.insertAdjacentHTML("afterbegin", MainView(columnDataTable));
  app.insertAdjacentHTML("afterbegin", HeaderView());
  app.insertAdjacentHTML("beforeend", HistoryView());

  Object.keys(columnDataTable).forEach((columnId) => {
    const currentColumn = document.querySelector(`#${columnId}`);
    renderCardList(currentColumn);
    renderListCount(currentColumn);
  });

  initEventListener();
})();
