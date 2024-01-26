import { store } from "../../../../../model/store";
export const closeCardFormHandler = (target) => {
  target.closest(".card-form").remove();
};

export const closeEditCardFormHandler = (target) => {
  const form = target.closest(".card-form--edit");
  const formId = form.id.split("-")[0];
  const columnId = form.closest(".card-list").id.split("-")[0];
  store.closeEditForm(formId, columnId)
};
