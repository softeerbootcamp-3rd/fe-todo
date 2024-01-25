import * as Column from "../column/index.js";

export function template() {
  return `
    <main class="columns surface-alt"></main>
    `;
}

export function render({ columns }) {
  const columnContainer = document.querySelector(".columns");

  columnContainer.innerHTML = `${columns
    .map((column) => {
      return `
        <section class="column" data-column-id="${column.id}">
        ${Column.template({ column })}
        </section>`;
    })
    .join("")}`;
}
