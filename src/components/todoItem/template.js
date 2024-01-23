import styles from "./todoItem.module.scss";
import closedIcon from "../../asset/img/closed.svg";
import editIcon from "../../asset/img/edit.svg";

// todoItem 컴포넌트 템플릿
export function todoItemtemplate(props) {
  return `
    <div class="${styles.todoItem}">
      <div>
        <textarea
          type="text"
          rows="1"
          todo-data="title"
          class="${styles.todoItem__itemTitle}"
          placeholder="제목을 입력하세요"
        >${props?.title ?? ""}</textarea>
        <textarea
          type="text"
          rows="1"
          todo-data="content"
          class="${styles.todoItem__itemContent}"
          placeholder="내용을 입력하세요"
        >${props?.content ?? ""}</textarea>
        <div class="${styles.todoItem__bottomContainer}">
          <p todo-data="author" class="${styles.todoItem__itemAuthor}">
            author by ${props?.createdOn}
          </p>
          <button
            todo-data="cancelBtn"
            class="${styles["todoItem__btn--inactive"]}"
          >
            취소
          </button>
          <button
            todo-data="submitBtn"
            class="${styles["todoItem__btn--active"]}"
            disabled
          >
            ${props?.addMode ? "등록" : "저장"}
          </button>
        </div>
      </div>
  
      <div
        todo-data="actionBtnContainer"
        class="${styles.todoItem__actionBtnContainer}"
      >
        <button todo-data="eraseBtn" class="actionBtn">
          <img class="actionBtn__closed" src="${closedIcon}" />
        </button>
        <button todo-data="editBtn" class="actionBtn">
          <img src="${editIcon}" />
        </button>
      </div>
    </div>
  `;
}
