let history = null;

export const showHistory = () => {
  if (!history) history = document.querySelector(".history");
  history.showModal();
};

export const closeHistory = () => {
  history.close();
};
