import styles from "./app.module.scss";
import header from "../header";
import todoHistory from "../todoHistory";
import todoListTable from "../todoListTable";
import modal from "../modal";

export default function App(renderTarget, initialData) {
  const views = mount(renderTarget, initialData);
  return attachHandlers(views, initialData);
}

function attachHandlers(
  { renderTarget, headerSection, todoSection, historySection, modalSection },
  initialData
) {
  const toggleHistoryList = () => {
    historySection.classList.toggle(styles["app__historySection--show"]);
    todoHistory(historySection, {});
  };

  const modalSectionClick = () => {
    modalSection.style.display = "none";
  };

  const showDeleteModal = ({ detail }) => {
    modalSection.style.display = "block";
    modal(modalSection, { msg: detail.msg, onDelete: detail.onDelete });
  };

  renderTarget.addEventListener("showDeleteModal", showDeleteModal);
  modalSection.addEventListener("click", modalSectionClick);
  document.addEventListener("toggleHistoryList", toggleHistoryList);

  return () => {
    renderTarget.removeEventListener("showDeleteModal", showDeleteModal);
    modalSection.removeEventListener("click", modalSectionClick);
    document.removeEventListener("toggleHistoryList", toggleHistoryList);
  };
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
