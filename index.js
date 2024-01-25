import { createColumns } from "./src/components/columns.js";
import { createLogBox } from "./src/components/log.js";
import todoStore from "./src/Store/store.js";

(async () => {
    const app = document.getElementById("app");
    const columnData = todoStore.getState();
    createLogBox(app);
    createColumns(app, columnData);
})();
