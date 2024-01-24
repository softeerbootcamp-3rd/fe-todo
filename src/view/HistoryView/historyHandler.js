import { ModalView, confirmHandlerInjector } from "../ModalView/ModalView.js";
import { historyListRender } from "../render.js";
import { store } from "../../model/store.js";

export const showHistory = () => {
  historyListRender();
  document.querySelector(".history").showModal();
};

export const closeHistory = () => {
  document.querySelector(".history").close();
};

const deleteHistory = () => {
  store.purgeHistory();
  historyListRender();
}

export const deleteHistoryHandler = (target) => {
  document.getElementById('history').insertAdjacentHTML('afterbegin', ModalView({content:"모든 사용자 활동 기록을 삭제할까요?", btnText:"삭제"}));
  confirmHandlerInjector(deleteHistory);
}