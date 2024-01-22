import * as Card from "../card/index.js";
import * as AddCard from "../add-card/index.js";

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

document.querySelector("#app").addEventListener("click", (event) => {
  const target = event.target.closest(".column__head-plus");
  if (target === null) {
    return;
  }

  const columnId = target.getAttribute("data-column-id");
  const editable = target.getAttribute("data-editable") === "true";
  const addCard = document.querySelector(
    `.card__editable[data-column-id="${columnId}"]`
  );
  // addCard 초기화
  addCard.querySelector(".card__title-input").value = "";
  addCard.querySelector(".card__description-input").value = "";

  addCard.style.display = editable ? "none" : "flex";
  target.setAttribute("data-editable", !editable);
});
