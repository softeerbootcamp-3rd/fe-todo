import { createModalTemplate } from "./templates.js";
import { createLogContent } from "./log.js";

export default function createModal(column, card) {
    const DEL = "을(를) 삭제";
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

        const cardTitle = card.querySelector(".registeredTitle").textContent;
        createLogContent(cardTitle, `${DEL}`, Date.now());
    });
}
