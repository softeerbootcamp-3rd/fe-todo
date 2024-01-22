import { initEventListener } from "./util/initEventListener.js";
import { HeaderView } from "./view/HeaderView.js";
import { HistoryView } from "./view/HistoryView.js";
import MainView from "./view/Main/index.js";

(function init() {
  const app = document.getElementById("app");

  app.insertAdjacentHTML("afterbegin", MainView());
  app.insertAdjacentHTML("afterbegin", HeaderView());
  app.insertAdjacentHTML("beforeend", HistoryView());
  initEventListener();
})();
