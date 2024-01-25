import { createColumns } from "./src/components/columns.js";
import { createLogBox } from "./src/components/log.js";
import { TodoStore } from "./src/Store/store.js";

(() => {
    const app = document.getElementById("app");

    async function initializeApp() {
        const store = new TodoStore();
        await store.fetchInitialData();
        createColumns(app, store);
        createLogBox(app);
    }

    initializeApp();
})();
