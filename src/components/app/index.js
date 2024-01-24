import styles from "./app.module.scss";
import header from "../header";
import todoHistory from "../todoHistory";
import todoListTable from "../todoListTable";
import modal from "../modal";

export default function App(renderTarget) {
  const views = mount(renderTarget);
  attachHandlers(views);
}

function attachHandlers({ renderTarget, historySection, modalSection }) {
  let destroyTodoHistory;
  const toggleHistoryList = (e) => {
    // this event is delegated
    if (e.target.closest('[data-node="historyToggleBtn"]') === null) return;
    if (destroyTodoHistory) destroyTodoHistory();
    historySection.classList.toggle(styles["app__historySection--show"]);
    destroyTodoHistory = todoHistory(historySection);
  };

  const modalSectionClick = () => {
    modalSection.style.display = "none";
  };

  const showDeleteModal = ({ detail }) => {
    console.log("showdeleteModal");
    modalSection.style.display = "block";
    modal(modalSection, {
      msg: detail.msg,
      onDeleteBtnClicked: detail.onDeleteBtnClicked,
    });
  };

  renderTarget.addEventListener("showDeleteModal", showDeleteModal);
  modalSection.addEventListener("click", modalSectionClick);
  document.addEventListener("click", toggleHistoryList);
}

function mount(renderTarget) {
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
