import styles from "./app.module.scss";
import header from "../header";
import todoHistory from "../todoHistory";
import todoListTable from "../todoListTable";
import modal from "../modal";

export default function App(renderTarget, initialData) {
  const views = mount(renderTarget, initialData);
  attachHandlers(views, initialData);
}

function attachHandlers(
  { renderTarget, headerSection, todoSection, historySection, modalSection },
  initialData
) {
  document.addEventListener("toggleHistoryList", () => {
    historySection.classList.toggle(styles["app__historySection--show"]);
    todoHistory(historySection, {});
  });

  modalSection.addEventListener("click", () => {
    modalSection.style.display = "none";
  });

  renderTarget.addEventListener("showDeleteModal", ({ detail }) => {
    modalSection.style.display = "block";
    modal(modalSection, { msg: detail.msg, onDelete: detail.onDelete });
  });
}

function mount(renderTarget, initialData) {
  renderTarget.innerHTML = /*html*/ `
    <div class="${styles.app}">
      <div data-node="headerSection" class=${styles.app__headerSection}></div>
      <div data-node="todoSection" class=${styles.app__todoSection}></div>
      <div data-node="historySection" class="${styles.app__historySection}"></div>
      <div data-node="modalSection" class="${styles.app__modalSection}"></div>
    </div>
  `;

  const headerSection = renderTarget.querySelector(
    '[data-node="headerSection"]'
  );
  const todoSection = renderTarget.querySelector('[data-node="todoSection"]');
  const historySection = renderTarget.querySelector(
    '[data-node="historySection"]'
  );
  const modalSection = renderTarget.querySelector('[data-node="modalSection"]');

  header(headerSection, {});
  todoListTable(todoSection, {});

  return {
    renderTarget,
    headerSection,
    todoSection,
    historySection,
    modalSection,
  };
}
