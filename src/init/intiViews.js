import { columnDataTable } from "../model/model.js";
import HeaderView from "../view/Header/index.js";
import HistoryView from "../view/History";
import MainView from "../view/Main/index.js";

export const initViews = () => {
  const app = document.getElementById("app");

  app.insertAdjacentHTML("afterbegin", MainView(columnDataTable));
  app.insertAdjacentHTML("afterbegin", HeaderView());
  app.insertAdjacentHTML("beforeend", HistoryView());
};
