import styles from "./app.module.scss";

export function AppTemplate(props) {
  return `<div class="${styles.app}">
    <div todo-section="headerSection"></div>
    <div todo-section="todoSection"></div>
    <div todo-section="historySection" class="${styles.app__historySection}"></div>
    <div todo-section="modalSection" class="${styles.app__modalSection}"></div>
  </div>`;
}
