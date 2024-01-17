import * as Card from "../card/index.js";
import * as EditableCard from "../editable-card/index.js";

export function template(data) {
  return `
    <section class="column">
        <h2 class="column__head">
        <span class="column__title text-bold display-bold16">
            해야할 일
        </span>
        <div class="badge rounded-8 text-weak">3</div>
        <button class="column__head-plus" type="button">
            <img src="./assets/icons/plus.svg" />
        <button class="column__head-close" type="button">
            <img src="./assets/icons/close.svg" />
        </button>
        </h2>
        <div class="column__cards-container">
        <ul class="column__cards">
            ${[1, 2, 3].map((data) => Card.template()).join("")}
            ${EditableCard.template()}
        </ul>
        </div>
    </section>
    `;
}

export function render(parent) {
  // FIXME 초기 데이터 넣어주기
  parent.insertAdjacentHTML("afterbegin", template([1, 2, 3]));
}
