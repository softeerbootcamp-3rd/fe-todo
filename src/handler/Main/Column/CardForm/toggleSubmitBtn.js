export const toggleSubmitBtn = ({ target }) => {
  const [titleInput, contentTextarea, submitButtonList] = [...target.parentElement.children];
  const submitButton = submitButtonList.children[1];
  submitButton.disabled = !(titleInput.value.trim() && contentTextarea.value.trim());
};
