export const closeHistory = () => {
  const history = document.querySelector(".history");
  history.classList.add("slideOut");

  const animationEndHandler = () => {
    history.classList.remove("slideOut");
    history.close();
    history.removeEventListener("animationend", animationEndHandler);
  };

  history.addEventListener("animationend", animationEndHandler);
};
