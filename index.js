import { generateColumns } from "./src/components/columns.js";
import Store from "./src/components/Store.js";

export const columnData = new Store();
generateColumns("app");
