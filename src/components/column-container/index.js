import * as Column from "../column/index.js";

export function template({ columns }) {
  return `
    <main class="columns surface-alt">
        ${columns.map((column) => Column.template({ column })).join("")}
    </main>
    `;
}
export function render(parent) {
  parent.insertAdjacentHTML(
    "beforeend",
    template({ columns: JSON.parse(localStorage.getItem("todolist")) })
  );
}
