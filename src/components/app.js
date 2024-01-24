import * as Header from "./header/index.js";
import * as ColumnContainer from "./column-container/index.js";
import * as ActionHistoryListDialog from "./action-history-list/index.js";
import * as Alert from "./alert/index.js";
import * as todos from "../features/todos/index.js";

const app = document.getElementById("app");

export async function initializeApp() {
  app.insertAdjacentHTML("afterbegin", Header.template());
  app.insertAdjacentHTML("beforeend", ColumnContainer.template());
  app.insertAdjacentHTML("beforeend", ActionHistoryListDialog.template());
  app.insertAdjacentHTML("beforeend", Alert.template());

  await todos.initializeCards({
    onChange: (state) => {
      ColumnContainer.render({ columns: state.todos });
    },
  });
}
