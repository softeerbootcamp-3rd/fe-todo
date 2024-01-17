import * as Column from "../column/index.js";

export function template(data) {
  return `
    <main class="columns surface-alt">
        ${data.map(() => Column.template()).join("")}
    </main>
    `;
}
export function render(parent) {
  // FIXME 초기 데이터 넣어주기
  parent.insertAdjacentHTML("beforeend", template([1, 2, 3]));
}
