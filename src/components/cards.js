import { createEditorTemplate, createCardInfoTemplate } from "./templates.js ";

// Card element
export default function Card() {
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
