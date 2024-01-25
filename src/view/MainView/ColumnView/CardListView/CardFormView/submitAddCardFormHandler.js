import { getDeviceInfo } from "../../../../../util/getDeviceInfo.js";
import { store } from "../../../../../model/store.js";

const createCardData = (target) => {
  const formData = new FormData(target);
  formData.set("author", getDeviceInfo());
  formData.set("cardId", 'card'+Date.now());
  return Object.fromEntries(formData);
};

const updateModel = ({ target, columnId }) => {
  const newCardData = createCardData(target);
  store.setCard({...newCardData, columnId});
};

export const submitAddCardFormHandler = (target) => {
  const columnId = target.closest(".main__column").id;
  updateModel({ target, columnId });

  target.remove();
};
