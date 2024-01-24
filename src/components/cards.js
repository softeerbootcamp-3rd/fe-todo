import { createEditorTemplate, createCardInfoTemplate } from "./templates.js ";
import { createLogContent } from "../components/log.js";

// Card element
export function Card() {
    const card = document.createElement("div");
    card.className = "newCard";

    card.innerHTML = createEditorTemplate();
    return card;
}

export function createCard(column, { cardList }) {
    cardList.forEach((cardInfo) => {
        const registerCard = registeredCard(cardInfo);
        column.appendChild(registerCard);
    });
}

function registeredCard({ title, content }) {
    const card = document.createElement("div");
    card.className = "registeredCard";

    card.innerHTML = createCardInfoTemplate(title, content);
    return card;
}

export function addNewCard({ target }) {
    const column = target.closest(".column");
    const isExistCard = column.querySelector(".newCard");
    if (!isExistCard) {
        const card = Card();
        column.appendChild(card);
        return;
    }
    isExistCard.remove();
}

export function registerCard({ parentTarget }) {
    const ADD = "에 등록";

    const columnTitle = parentTarget.querySelector(".columnTitle").textContent;
    const title = parentTarget.querySelector(".title");
    const content = parentTarget.querySelector(".content");
    const countBox = parentTarget.querySelector(".countBox");
    const card = parentTarget.querySelector(".newCard");

    const newCount = parseInt(countBox.textContent) + 1;
    countBox.innerHTML = newCount;
    card.className = "registeredCard";

    const originalTitle = title.value;
    const originalContent = content.value;

    card.innerHTML = createCardInfoTemplate(originalTitle, originalContent);
    createLogContent(
        `${originalTitle}을(를)`,
        `${columnTitle}${ADD}`,
        Date.now()
    );
}
