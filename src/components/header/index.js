import history from "../../asset/img/history.svg";
import styles from "./header.module.scss";

export default function header(target, data) {
  const views = mount(data);
  attachHandlers(target, data);
}

function mount(target, data) {
  target.innerHTML = /*html*/ `
    <div class="${styles.header}">
      <h1 class="${styles.header__title}">TODO LIST</h1>
      <img data-node="historyBtn" class="${styles.header__history}" src="${history}">
    </div>
    `;

  const historyBtn = target.querySelector('[data-node="historyBtn"]');
  return { historyBtn };
}

function attachHandlers({ historyBtn }, data) {
  historyBtn.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("toggleHistoryList"));
  });
}
