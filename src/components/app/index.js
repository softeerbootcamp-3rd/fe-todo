import styles from "./app.module.scss";
import header from "../header";
import todoHistory from "../todoHistory";
import todoListTable from "../todoListTable";
import modal from "../modal";

export default function App(parent, props) {
  parent.innerHTML = `
        <div class="${styles.app}">
          <div todo-data="headerSection"></div>
          <div todo-data="todoSection"></div>
          <div todo-data="historySection" class="${styles.app__historySection}"></div>
          <div todo-data="modalSection" class="${styles.app__modalSection}"></div>
        </div>
    `;

  //헤더 컴포넌트 마운트
  const headerSection = parent.querySelector('[todo-data="headerSection"]');
  header(headerSection, {});

  //todo컴포넌트 마운트
  //=> 처음에 초기값, API 모든 데이터를 넣어줘야함.
  //=> 생성, 수정, 삭제는 API요청은 있으나 다시 받아오지는 않음.
  const todoSection = parent.querySelector('[todo-data="todoSection"]');
  todoListTable(todoSection, {});

  //클릭 시 History 컴포넌트 마운트
  const historySection = parent.querySelector('[todo-data="historySection"]');
  document.addEventListener("toggleHistoryList", () => {
    historySection.classList.toggle(styles["app__historySection--show"]);
    todoHistory(historySection, {});
  });

  // 모달 섹션
  const modalSection = parent.querySelector('[todo-data="modalSection"]');
  //배경 클릭 시 모달 삭제
  modalSection.addEventListener("click", () => {
    modalSection.style.display = "none";
  });

  //showDeleteModal 이벤트 발생 시 모달 마운트
  parent.addEventListener("showDeleteModal", ({ detail }) => {
    // 모달 생성
    modalSection.style.display = "block";
    modal(modalSection, { msg: detail.msg, onDelete: detail.onDelete });
  });
}
