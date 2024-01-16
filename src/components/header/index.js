import history from "../../asset/img/history.svg";
import styles from "./header.module.scss";

export default function header(parent, props) {
  parent.innerHTML = `
    <div class="${styles.header}">
      <h1 class="${styles.header__title}">TODO LIST</h1>
      <img class="${styles.header__history}" src="${history}">
    </div>
    `;
}
