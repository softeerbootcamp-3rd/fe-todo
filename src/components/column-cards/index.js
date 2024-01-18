import * as Card from "../card/index.js";
import * as EditableCard from "../editable-card/index.js";

export function template({ column }) {
  return `
    <ul class="column__cards" data-column-id="${column.id}">
        ${EditableCard.template({ columnId: column.id })}
        ${column.cards.map((item) => Card.template(item)).join("")}
    </ul>
    `;
}
