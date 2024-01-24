import history from "../../asset/img/history.svg";
import styles from "./header.module.scss";

export default function header(renderTarget, initialData) {
  const views = mount(renderTarget, initialData);
  attachHandlers(views, initialData);
}

function mount(renderTarget, initialData) {
  renderTarget.innerHTML = /*html*/ `
    <div class="${styles.header}">
      <h1 class="${styles.header__title}">TODO LIST</h1>
      <img data-node="historyBtn" class="${styles.header__history}" src="${history}">
    </div>
    `;

  const historyBtn = renderTarget.querySelector('[data-node="historyBtn"]');
  return { renderTarget, historyBtn };
}

function attachHandlers({ renderTarget, historyBtn }, initialData) {
  const historyBtnClick = () => {
    document.dispatchEvent(new CustomEvent("toggleHistoryList"));
  };
  historyBtn.addEventListener("click", historyBtnClick);
}
