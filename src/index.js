import { initComponents } from "./init/initComponents.js";
import { initEventListener } from "./init/initEventListener.js";
import { initViews } from "./init/initViews.js";
import { store } from "./model/Store.js";

(async () => {
  try {
    await store.initDataFromServer();
    initViews();
    initComponents();
    initEventListener();
  } catch (error) {
    console.error("Failed to initialize the app:", error.message);
  }
})();
