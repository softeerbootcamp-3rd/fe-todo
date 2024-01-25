import { store } from "../../../../../model/store.js";

const createCardData = (target) => {
  return Object.fromEntries(new FormData(target));
};

const updateModel = ({ target, cardId }) => {
  const columnId = target.closest('.main__column').id;
  let newCardData = createCardData(target);
  store.editCard({cardId, columnId, newCardData});
};

export const submitEditCardFormHandler = (target) => {
  //ToDo - 이 부분 개선할 수 없을까?
  const cardId = target.id.split("-")[0];
  //
  updateModel({ target, cardId });

  target.remove();
};
