import styles from "./todoHistory.module.scss";
import closedIcon from "../../asset/img/closed.svg";
import todoHistoryItem from "../todoHistoryItem";
import { useStore } from "../../utils/store";
import { historyStore } from "../../stores/historyStore";
import { createComponent } from "../../utils/ui";

export default function todoHistory(renderTarget) {
  const views = mount(renderTarget);
  const store = attachStore(views);
  attachHandlers(views, store);
  return store.destroy;
}

function attachStore({ historyList }) {
  let childComponents = [];
  const updateView = (list) => {
    if (list === undefined) return;
    // destroy previous components
    childComponents.forEach((v) => {
      v.element.parentNode.removeChild(v.element);
      if (v.destroy) v.destroy();
    });
    childComponents = [];

    // 순서대로 생성해서 삽입
    let previousElement;
    for (const history of list) {
      const component = createComponent(todoHistoryItem, { ...history });
      childComponents.push(component);
      if (!previousElement) historyList.appendChild(component.element);
      else previousElement.insertAdjacentElement("afterend", component.element);
      previousElement = component.element;
    }
  };

  const store = useStore(historyStore, updateView, (state) => {
    return state.history;
  });

  // 로드할때마다 history reload
  store.state.fetch();

  return store;
}

function attachHandlers({ renderTarget, historyClearBtn }, { state }) {
  const historyClearBtnClick = () => {
    renderTarget.dispatchEvent(
      new CustomEvent("showDeleteModal", {
        detail: {
          msg: "모든 사용자 활동 기록을 삭제할까요?",
          onDeleteBtnClicked: state.clear,
        },
        bubbles: true,
      })
    );
  };

  historyClearBtn.addEventListener("click", historyClearBtnClick);
}

function mount(renderTarget, initialData) {
  renderTarget.innerHTML = /*html*/ `
  <div class="${styles["todoHistory"]}">
    <div class="${styles.todoHistory__header}">
      <h2 class="${styles.todoHistory__title}">사용자 활동 기록</h2>
      <button data-node="historyToggleBtn" class="${styles.todoHistory__closedBtn}">
        <img class="${styles.todoHistory__closedIcon}" src="${closedIcon}"/>
        닫기
      </button>
    </div>
    <div data-node="history_list" class="${styles.todoHistory__historyList}">
    </div>
    <div class="${styles.todoHistory__footer}">
      <button data-node="historyClearBtn" class="${styles.todoHistory__clearBtn}">기록 전체 삭제</button>
    </div>
  </div>`;

  const historyList = renderTarget.querySelector('[data-node="history_list"]');
  const historyCloseBtn = renderTarget.querySelector(
    '[data-node="historyCloseBtn"]'
  );
  const historyClearBtn = renderTarget.querySelector(
    '[data-node="historyClearBtn"]'
  );
  return {
    renderTarget,
    historyList,
    historyCloseBtn,
    historyClearBtn,
  };
}
