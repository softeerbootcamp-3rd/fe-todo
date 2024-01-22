import { historyListRender } from "../render.js";

export const showHistory = () => {
  historyListRender();
  document.querySelector(".history").showModal();
};

export const closeHistory = () => {
  document.querySelector(".history").close();
};
