import todoStore from "../../store/todoStore.js";
import * as Column from "../column/index.js";

export function template({ columns }) {
  return `
    <main class="columns surface-alt">
      ${columns
        .map((column) => {
          return `
            <section class="column" data-column-id="${column.id}">
              ${Column.template({ column })}
            </section>`;
        })
        .join("")}
    </main>
    `;
}

export function render(parent) {
  parent.insertAdjacentHTML(
    "beforeend",
    template({ columns: todoStore.getState() })
  );
}

export function renderColumn(columnId, column) {
  const target = document.querySelector(`.column[data-column-id="${columnId}"`);
  target.innerHTML = Column.template({ column });
}

export function renderColumns(parameter) {
  parameter.forEach((columnId) => {
    const column = todoStore
      .getState()
      .find(({ id }) => id === Number(columnId));

    renderColumn(columnId, column);
  });
}
