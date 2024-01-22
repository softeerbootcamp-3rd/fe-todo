export const closeAddCardForm = (target) => {
  target.closest(".card-form").remove();
};

export const closeEditCardForm = (target) => {
  const form = target.closest(".card-form--edit");
  const formId = form.id.split("-")[1];
  form.remove();
  document.getElementById(formId).style.display = "flex";
};
