import { initEventListener } from "./view/initEventListener.js";
import { store } from "./model/store.js";
import { history } from "./model/history.js";

(function init() {
  store.initRender();
  history.initRender();
  initEventListener();
})();
