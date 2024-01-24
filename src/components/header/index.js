import history from "../../asset/img/history.svg";
import styles from "./header.module.scss";

export default function header(renderTarget, initialData) {
  const views = mount(renderTarget, initialData);
}

function mount(renderTarget) {
  renderTarget.innerHTML = /*html*/ `
    <div class="${styles.header}">
      <h1 class="${styles.header__title}">TODO LIST</h1>
      <img data-node="historyToggleBtn" class="${styles.header__history}" src="${history}">
    </div>
    `;

  const historyBtn = renderTarget.querySelector('[data-node="historyBtn"]');
  return { renderTarget, historyBtn };
}
