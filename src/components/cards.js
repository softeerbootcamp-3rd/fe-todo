import { createEditorTemplate } from "./templates.js ";

// Card element
export default function Card() {
    const card = document.createElement("div");
    card.className = "newCard";

    card.innerHTML = createEditorTemplate();
    return card;
}
