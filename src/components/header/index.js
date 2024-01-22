import history from "../../asset/img/history.svg";
import styles from "./header.module.scss";

export default function header(parent, data) {
  parent.innerHTML = template(data);
  controller(parent, data);
}

function template(data) {
  return `
    <div class="${styles.header}">
      <h1 class="${styles.header__title}">TODO LIST</h1>
      <img data-node="historyBtn" class="${styles.header__history}" src="${history}">
    </div>
    `;
}

function controller(parent, data) {
  const historyBtn = parent.querySelector('[data-node="historyBtn"]');
  historyBtn.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("toggleHistoryList"));
  });
}
