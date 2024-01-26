import { AppTemplate } from "./template";
import header from "../header";
import todoHistory from "../todoHistory";
import todoListTable from "../todoListTable";
import modal from "../modal";
import { applyDragAndDrop } from "../../utils/dragAndDrop";
import { store } from "../../store/todoStore";
import styles from "./app.module.scss";

export default function App(parent, props) {
  parent.innerHTML = AppTemplate(props);

  //헤더 컴포넌트 마운트
  const headerSection = parent.querySelector('[todo-section="headerSection"]');
  header(headerSection, {});

  //todo컴포넌트 마운트
  const todoSection = parent.querySelector('[todo-section="todoSection"]');
  todoListTable(todoSection, { todoList: store.getTodoList() });

  //History 컴포넌트 마운트
  const historySection = parent.querySelector(
    '[todo-section="historySection"]'
  );
  document.addEventListener("toggleHistoryList", () => {
    historySection.classList.toggle(styles["app__historySection--show"]);
    todoHistory(historySection, {});
  });

  // 모달 섹션
  const modalSection = parent.querySelector('[todo-section="modalSection"]');
  //배경 클릭 시 모달 삭제
  modalSection.addEventListener("click", () => {
    modalSection.style.display = "none";
  });

  //showDeleteModal 이벤트 발생 시 모달 마운트
  document.addEventListener("showDeleteModal", ({ detail }) => {
    modalSection.style.display = "block";
    modal(modalSection, { msg: detail.msg, onDelete: detail.onDelete });
  });

  //drag and drop 컴포넌트에 적용
  const draggables = parent.querySelectorAll('[todo-data="todoItem"]');
  const containers = parent.querySelectorAll("[todo-data='items']");
  applyDragAndDrop(draggables, containers);
}
