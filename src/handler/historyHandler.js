import { historyListRender } from "../util/render";

export const showHistory = () => {
  historyListRender();
  document.querySelector(".history").showModal();
};

export const closeHistory = () => {
  document.querySelector(".history").close();
};
