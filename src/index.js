import { initEventListener } from "./init/initEventListener.js";
import HeaderView from "./view/Header/index.js";
import HistoryView from "./view/History";
import MainView from "./view/Main/index.js";

(function init() {
  const app = document.getElementById("app");

  app.insertAdjacentHTML("afterbegin", MainView());
  app.insertAdjacentHTML("afterbegin", HeaderView());
  app.insertAdjacentHTML("beforeend", HistoryView());
  initEventListener();
})();
