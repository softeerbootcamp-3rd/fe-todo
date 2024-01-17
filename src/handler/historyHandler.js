let history = null;

export const showHistory = () => {
  if (!history) history = document.querySelector(".history");
  history.showModal();
};

export const closeHistory = () => {
  history.close();
};

export const closeHistoryHandler = (target) => {
  if (target.nodeName === "DIALOG") {
    closeHistory();
  } else if (target.classList.contains("modal__form--close")) {
    closeHistory();
  }
};
