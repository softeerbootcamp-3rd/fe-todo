import { createColumns } from "./src/components/columns.js";
import { createLogBox } from "./src/components/log.js";

(function () {
    const app = document.getElementById("app");
    createColumns(app);
    createLogBox(app);
})();
