import { historyDataTemplate } from "../../../../../model/historyDataTemplate.js";
import { renderCardList, renderListCount } from "../../../../render.js";
import { ModalView, confirmHandlerInjector } from "../../../../ModalView/ModalView.js";
import { store } from "../../../../../model/store.js";

const addNewHistory = (currentCardId) => {
  const card = store.getCard(currentCardId)
  const newHistory = {
    ...historyDataTemplate(),
    username: card.getAuthor(),
    time: Date.now(),
    cardTitle: card.getTitle(),
    type: "삭제",
  };
  store.setHistory(newHistory);
};

const updateModel = ({ currentColumnId, currentCardId }) => {
  const colList = store.getColumnIdList(currentColumnId);
  store.deleteCard(currentCardId);
};

const deleteCard = (target) => {
  const currentColumn = target.closest(".main__column");
  const currentCardId = target.closest(".card").id;
  addNewHistory(currentCardId);
  updateModel({ currentColumnId: currentColumn.id, currentCardId });
  renderCardList(currentColumn);
  renderListCount(currentColumn);
};

export const deleteCardHandler = (target) => {
  /*
  const confirmDelete = confirm("정말로 삭제하시겠습니까?");
  if (confirmDelete) {
    deleteCard(target);
  }
  */
  document.querySelector('#app').insertAdjacentHTML('afterbegin', ModalView({content:"선택한 카드를 삭제할까요?", btnText:"삭제"}));
  confirmHandlerInjector(()=>deleteCard(target));
};
