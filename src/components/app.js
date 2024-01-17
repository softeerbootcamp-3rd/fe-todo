import * as Header from "./header/index.js";
import * as ColumnContainer from "./column-container/index.js";
import * as ActionHistoryListDialog from "./action-history-list/index.js";
import * as Alert from "./alert/index.js";

const app = document.getElementById("app");

export function intilizeApp() {
  Header.render(app);
  ColumnContainer.render(app);
  ActionHistoryListDialog.render(app);
  Alert.render(app);
}
