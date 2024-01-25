import { ModalView, confirmHandlerInjector } from "../../../../ModalView/ModalView.js";
import { store } from "../../../../../model/store.js";

const deleteCard = (target) => {
  const columnId = target.closest(".main__column").id;
  const cardId = target.closest(".card").id;
  store.deleteCard({cardId, columnId});
};

export const deleteCardHandler = (target) => {
  document.querySelector('#app').insertAdjacentHTML('afterbegin', ModalView({content:"선택한 카드를 삭제할까요?", btnText:"삭제"}));
  confirmHandlerInjector(()=>deleteCard(target));
};
