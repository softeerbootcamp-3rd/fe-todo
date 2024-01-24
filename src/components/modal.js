import { createModalTemplate } from "./templates.js";
import { columnData } from "../../index.js";

export default function createModal(column, card) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = createModalTemplate();
  document.getElementById("app").appendChild(modal);

  const cancelButton = document.getElementById("cancelButton");
  cancelButton.addEventListener("click", () => {
    modal.remove();
  });

  const deleteButton = document.getElementById("deleteButton");
  deleteButton.addEventListener("click", () => {
    modal.remove();
    const cardList = document.getElementById(`cardList-${column.id}`);
    cardList.innerHTML = "";
    columnData.removeCardData(column.id, card.id);

    const countBox = column.querySelector(".countBox");
    const newCount = Number(countBox.textContent) - 1;
    countBox.innerHTML = newCount;
  });
}
