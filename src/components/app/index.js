import styles from "./app.module.scss";
import header from "../header";
import todoHistory from "../todoHistory";
import todoListTable from "../todoListTable";
import modal from "../modal";

export default function App(parent, props) {
  parent.innerHTML = `
        <div class="${styles.app}">
          <div todo-data="modalSection" class="${styles.app__modalSection}"></div>
          <div todo-data="headerSection"></div>
          <div todo-data="todoSection"></div>
          <div todo-data="historySection" class="${styles.app__historySection}"></div>
        </div>
    `;

  const historySection = parent.querySelector('[todo-data="historySection"]');

  todoHistory(historySection, {
    items: [
      {
        id: 0,
        authorName: "쓴 사람 이름입니다",
        timeStamp: 18121312312,
        actionId: 0,
        todoTitle: "새로운 투두",
        todoSrc: null,
        todoDst: null,
      },
      {
        id: 1,
        authorName: "쓴 사람 이름입니다",
        timeStamp: 18121312312,
        actionId: 1,
        todoTitle: " 삭제한 투두",
        todoSrc: null,
        todoDst: null,
      },
      {
        id: 2,
        authorName: "쓴 사람 이름입니다",
        timeStamp: 18121312312,
        actionId: 3,
        todoTitle: "이동한 투두",
        todoSrc: "하고있는 일",
        todoDst: "해야하는 일",
      },
      {
        id: 2,
        authorName: "쓴 사람 이름입니다",
        timeStamp: 18121312312,
        actionId: 3,
        todoTitle: "이동한 투두",
        todoSrc: "하고있는 일",
        todoDst: "해야하는 일",
      },
      {
        id: 2,
        authorName: "쓴 사람 이름입니다",
        timeStamp: 18121312312,
        actionId: 3,
        todoTitle: "이동한 투두",
        todoSrc: "하고있는 일",
        todoDst: "해야하는 일",
      },
      {
        id: 2,
        authorName: "쓴 사람 이름입니다",
        timeStamp: 18121312312,
        actionId: 3,
        todoTitle: "이동한 투두",
        todoSrc: "하고있는 일",
        todoDst: "해야하는 일",
      },
    ],
  });
  const headerSection = parent.querySelector('[todo-data="headerSection"]');
  header(headerSection, {});

  const todoSection = parent.querySelector('[todo-data="todoSection"]');
  todoListTable(todoSection, {
    todoData: {
      해야할일: [
        {
          id: 0,
          title: "투두 아이템 제목 입니다.",
          content: "투두 아이템 내용입니다.",
          authorName: "쓴 사람 이름입니다",
        },
        {
          id: 1,
          title: "투두 아이템 제목 입니다.",
          content: "투두 아이템 내용입니다.",
          authorName: "쓴 사람 이름입니다",
        },
      ],
      "하고 있는일": [
        {
          id: 2,
          title: "투두 아이템 제목 입니다.",
          content: "투두 아이템 내용입니다.",
          authorName: "쓴 사람 이름입니다",
        },
        {
          id: 3,
          title: "투두 아이템 제목 입니다.",
          content: "투두 아이템 내용입니다.",
          authorName: "쓴 사람 이름입니다",
        },
      ],
    },
  });

  const modalSection = parent.querySelector('[todo-data="modalSection"]');
  modalSection.addEventListener("click", () => {
    modalSection.style.display = "none";
  });

  //히스토리 클릭시 이벤트
  document.addEventListener("toggleHistoryList", () => {
    historySection.classList.toggle(styles["app__historySection--show"]);
  });

  document.addEventListener("showDeleteModal", ({ detail }) => {
    // 모달 생성
    modalSection.style.display = "block";
    modal(modalSection, { msg: detail.msg, onDelete: detail.onDelete });
  });
}
