import * as Card from "../card/index.js";
import * as EditableCard from "../editable-card/index.js";

export function template({ column }) {
  return `
    <ul class="column__cards" data-column-id="${column.id}">
        ${EditableCard.template({ columnId: column.id })}
        ${column.cards
          .map((card) => Card.template({ columnId: column.id, card }))
          .join("")}
    </ul>
    `;
}
