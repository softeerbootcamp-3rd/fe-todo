export const inputCardHandler = ({ target }) => {
  if(target.classList[0] !== 'js-card-form__input') return ;
  const [titleInput, contentTextarea, submitButtonList] = [...target.parentElement.children];
  const submitButton = submitButtonList.children[1];

  // Enable the submit button only if both title and content have values
  submitButton.disabled = !(titleInput.value.trim() && contentTextarea.value.trim());
};
