import { getLocalStorage } from "../../utils/local-storage.js";
import * as Column from "../column/index.js";
import { observe } from "../../store/observer.js";

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
  console.log("render column");
  parent.insertAdjacentHTML(
    "beforeend",
    template({ columns: getLocalStorage("todolist") })
  );
}
