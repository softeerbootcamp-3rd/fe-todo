import * as Card from '../card/index.js'

export function template({ column }) {
  return `
    <section class="column">
        <h2 class="column__head">
        <span class="column__title text-bold display-bold16">
            ${column.columnName}
        </span>
        <div class="badge rounded-8 text-weak">${column.cards.length}</div>
        <button class="column__head-plus" type="button">
            <img src="./assets/icons/plus.svg" />
        <button class="column__head-close" type="button">
            <img src="./assets/icons/close.svg" />
        </button>
        </h2>
        <div class="column__cards-container">
            <ul class="column__cards">
                ${column.cards.map((item) => Card.template(item)).join('')}
            </ul>
        </div>
    </section>
    `
}
