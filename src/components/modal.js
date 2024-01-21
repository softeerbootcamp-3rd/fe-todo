import { createModalTemplate } from "./templates.js";

export default function createModal(column, card) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = createModalTemplate();
  document.getElementById("app").appendChild(modal);

  const cancelButton = document.getElementById("cancelButton");
  cancelButton.addEventListener("click", () => {
    modal.remove();
  });

  deleteButton.addEventListener("click", () => {
    modal.remove();
    card.remove();

    const countBox = column.querySelector(".countBox");
    const newCount = Number(countBox.textContent) - 1;
    countBox.innerHTML = newCount;
  });
}
