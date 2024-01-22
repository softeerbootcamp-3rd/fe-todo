import styles from "./app.module.scss";
import header from "../header";
import todoHistory from "../todoHistory";
import todoListTable from "../todoListTable";
import modal from "../modal";

export default function App(target, data) {
  target.innerHTML = template(data);
  controller(target, data);
}

function controller(target, data) {
  //헤더 컴포넌트 마운트
  const headerSection = target.querySelector('[data-node="headerSection"]');
  header(headerSection, {});

  //todo컴포넌트 마운트
  //=> 처음에 초기값, API 모든 데이터를 넣어줘야함.
  //=> 생성, 수정, 삭제는 API요청은 있으나 다시 받아오지는 않음.
  const todoSection = target.querySelector('[data-node="todoSection"]');
  todoListTable(todoSection, {});

  //클릭 시 History 컴포넌트 마운트
  const historySection = target.querySelector('[data-node="historySection"]');
  document.addEventListener("toggleHistoryList", () => {
    historySection.classList.toggle(styles["app__historySection--show"]);
    todoHistory(historySection, {});
  });

  // 모달 섹션
  const modalSection = target.querySelector('[data-node="modalSection"]');
  //배경 클릭 시 모달 삭제
  modalSection.addEventListener("click", () => {
    modalSection.style.display = "none";
  });

  //showDeleteModal 이벤트 발생 시 모달 마운트
  target.addEventListener("showDeleteModal", ({ detail }) => {
    // 모달 생성
    modalSection.style.display = "block";
    modal(modalSection, { msg: detail.msg, onDelete: detail.onDelete });
  });
}

function template(data) {
  return /*html*/ `
    <div class="${styles.app}">
      <div data-node="headerSection" class=${styles.app__headerSection}></div>
      <div data-node="todoSection" class=${styles.app__todoSection}></div>
      <div data-node="historySection" class="${styles.app__historySection}"></div>
      <div data-node="modalSection" class="${styles.app__modalSection}"></div>
    </div>
  `;
}
