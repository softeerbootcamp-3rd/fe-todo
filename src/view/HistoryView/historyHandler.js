import { ModalView, confirmHandlerInjector } from "../ModalView/ModalView.js";
import { historyListRender } from "../render.js";
import {history} from "../../model/history.js";

export const showHistory = () => {
  history.show();
};

export const closeHistory = () => {
  history.hide();
};

const deleteHistory = () => {
  history.purge();
}

export const deleteHistoryHandler = (target) => {
  document.getElementById('history').insertAdjacentHTML('afterbegin', ModalView({content:"모든 사용자 활동 기록을 삭제할까요?", btnText:"삭제"}));
  confirmHandlerInjector(deleteHistory);
}