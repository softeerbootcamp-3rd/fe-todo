import history from "../../asset/img/history.svg";
import styles from "./header.module.scss";

export function headerTemplate() {
  return `
    <div class="${styles.header}">
      <h1 class="${styles.header__title}">TODO LIST</h1>
      <img todo-data="historyBtn" class="${styles.header__history}" src="${history}">
    </div>
    `;
}
