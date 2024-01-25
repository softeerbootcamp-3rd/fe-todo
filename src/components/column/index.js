import * as Card from "../card/index.js";
import * as AddCard from "../add-card/index.js";
import { setEvent } from "../../utils/set-event.js";

const app = document.getElementById("app");

export function template({ column }) {
  return `
      <h2 class="column__head">
      <span class="column__title text-bold display-bold16">
          ${column.columnName}
      </span>
      <div class="badge rounded-8 text-weak">${column.cards.length}</div>
      <button class="column__head-plus" data-editable=false data-column-id="${
        column.id
      }" type="button">
          <img src="./assets/icons/plus.svg" width='24' height='24' />
      <button class="column__head-close" type="button">
          <img src="./assets/icons/close.svg" width='24' height='24' />
      </button>
      </h2>
      <div class="column__cards-container" data-column-id="${column.id}">
        <ul class="column__cards" data-column-id="${column.id}">
        ${AddCard.template({ columnId: column.id })}
        ${column.cards
          .map((card) => Card.template({ columnId: column.id, card }))
          .join("")}
        </ul>
      </div>
    `;
}

export const render = ({ column }) => {
  const columnEle = document.querySelector(
    `.column[data-column-id="${column.id}"]`
  );
  columnEle.innerHTML = `${template({
    column,
  })}`;
};

setEvent(app, "click", (event) => {
  const addCardButton = event.target.closest(".column__head-plus");
  if (!addCardButton) return;

  const columnId = addCardButton.getAttribute("data-column-id");
  const editable = addCardButton.getAttribute("data-editable") === "true";
  const editableCard = document.querySelector(
    `.card__editable[data-column-id="${columnId}"]`
  );
  editableCard.style.display = editable ? "none" : "flex";
  addCardButton.setAttribute("data-editable", !editable);
});
