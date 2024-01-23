export const closeCardFormHandler = (target) => {
  target.closest(".card-form").remove();
};

export const closeEditCardFormHandler = (target) => {
  const form = target.closest(".card-form--edit");
  const formId = form.id.split("-")[1];
  form.remove();
  document.getElementById(formId).style.display = "flex";
};
