import { renderHistoryList } from "../../view/History/renderHistoryList";

export const showHistory = () => {
  renderHistoryList();
  const history = document.querySelector(".history");
  history.showModal();
  history.classList.add("open", "slideIn");
};

function closeDialog() {
  var dialog = document.getElementById("myDialog");
  dialog.classList.remove("open");
  dialog.classList.add("slideOut");
}

function handleAnimationEnd(event) {
  // Check if the animation that ended is the slideOut animation
  if (event.animationName === "slideOut") {
    var dialog = document.getElementById("myDialog");
    dialog.close();
  }
}
