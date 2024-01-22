import { cardDataTable, columnDataTable, historyDataList } from "../../../../model/model.js";
import { historyDataTemplate } from "../../../../util/historyDataTemplate.js";
import { renderCardList, renderListCount } from "../../../../util/render.js";
import { ModalView } from "../view/components/modalView.js";

const addNewHistory = (currentCardId) => {
  const { author: username, title: cardTitle } = cardDataTable[currentCardId];
  const newHistory = {
    ...historyDataTemplate(),
    username,
    time: Date.now(),
    cardTitle,
    type: "삭제",
  };
  historyDataList.unshift(newHistory);
};

const updateModel = ({ currentColumnId, currentCardId }) => {
  const colList = columnDataTable[currentColumnId].value;
  columnDataTable[currentColumnId].value = colList.filter((cardId) => cardId !== currentCardId);
  delete cardDataTable[currentCardId];
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
  document.querySelector('#app').insertAdjacentHTML('afterbegin', ModalView({content:"모든 사용자의 활동 기록을 삭제할까요?", btnText:"삭제"}));
};
