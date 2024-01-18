import { createModalTemplate } from "./templates.js";

export default function createModal(column, card) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.id = "myModal";

  modal.innerHTML = createModalTemplate();
  document.getElementById("app").appendChild(modal);

  const cancelButton = document.getElementById("cancelButton");
  cancelButton.addEventListener("click", () => {
    modal.remove();
  });

  deleteButton.addEventListener("click", () => {
    modal.remove();
    //카드 삭제 및 이후 column count 값 변경 로직
    card.remove();
    const countBox = column.querySelector(".countBox");
    const newCount = Number(countBox.textContent) - 1;
    countBox.innerHTML = newCount;
  });
}
