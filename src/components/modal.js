import { createModalTemplate } from "./templates.js";
import todoStore, { DELETE_CARD } from "./todoStore.js";

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
    const action = {
      type: DELETE_CARD,
      payload: {
        id: card.id,
        columnId: column.id,
      },
    };
    todoStore.dispatch(action);
  });
}
