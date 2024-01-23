import styles from "./app.module.scss";
import header from "../header";
import todoHistory from "../todoHistory";
import todoListTable from "../todoListTable";
import modal from "../modal";

export default function App(target, data) {
  const views = mount(target, data);
  attachHandlers(views, data);
}

function attachHandlers(
  { target, headerSection, todoSection, historySection, modalSection },
  data
) {
  document.addEventListener("toggleHistoryList", () => {
    historySection.classList.toggle(styles["app__historySection--show"]);
    todoHistory(historySection, {});
  });

  modalSection.addEventListener("click", () => {
    modalSection.style.display = "none";
  });

  target.addEventListener("showDeleteModal", ({ detail }) => {
    modalSection.style.display = "block";
    modal(modalSection, { msg: detail.msg, onDelete: detail.onDelete });
  });
}

function mount(target, data) {
  target.innerHTML = /*html*/ `
    <div class="${styles.app}">
      <div data-node="headerSection" class=${styles.app__headerSection}></div>
      <div data-node="todoSection" class=${styles.app__todoSection}></div>
      <div data-node="historySection" class="${styles.app__historySection}"></div>
      <div data-node="modalSection" class="${styles.app__modalSection}"></div>
    </div>
  `;

  const headerSection = target.querySelector('[data-node="headerSection"]');
  const todoSection = target.querySelector('[data-node="todoSection"]');
  const historySection = target.querySelector('[data-node="historySection"]');
  const modalSection = target.querySelector('[data-node="modalSection"]');

  header(headerSection, {});
  todoListTable(todoSection, {});

  return { target, headerSection, todoSection, historySection, modalSection };
}
