import history from "../../asset/img/history.svg";
import styles from "./header.module.scss";

export default function header(target, data) {
  target.innerHTML = template(data);
  controller(target, data);
}

function template(data) {
  return /*html*/ `
    <div class="${styles.header}">
      <h1 class="${styles.header__title}">TODO LIST</h1>
      <img data-node="historyBtn" class="${styles.header__history}" src="${history}">
    </div>
    `;
}

function controller(target, data) {
  const historyBtn = target.querySelector('[data-node="historyBtn"]');
  historyBtn.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("toggleHistoryList"));
  });
}
