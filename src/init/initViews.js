import { columnDataTable } from "../model/model.js";
import { HeaderView } from "../view/Header/HeaderView.js";

import { HistoryView } from "../view/History/HistoryView.js";

import { MainView } from "../view/Main/MainView.js";

export const initViews = () => {
  const app = document.getElementById("app");

  app.insertAdjacentHTML("afterbegin", MainView(columnDataTable));
  app.insertAdjacentHTML("afterbegin", HeaderView());
  app.insertAdjacentHTML("beforeend", HistoryView());
};
