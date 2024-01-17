import styles from "./todoItem.module.scss";
import { todoList__actionBtn } from "../todoList/todoList.module.scss";
import closedIcon from "../../asset/img/closed.svg";
import editIcon from "../../asset/img/edit.svg";

export default function todoItem(parent, props) {
  parent.innerHTML = `
        <div class="${styles.todoItem}">
            <div>
                <textarea type="text" rows="1" todo-data="title" class="${styles.todoItem__itemTitle}" placeholder="제목을 입력하세요">${props.title}</textarea>
                <textarea type="text" rows="1" todo-data="content" class="${styles.todoItem__itemContent}" placeholder="내용을 입력하세요">${props.content}</textarea>
                <div class="${styles.todoItem__bottomContainer}">
                    <p todo-data="author" class="${styles.todoItem__itemAuthor}">author by ${props.authorName}</p>
                    <button todo-data="cancelBtn" class="${styles["todoItem__btn--inactive"]}">취소</button>
                    <button todo-data="submitBtn" class="${styles["todoItem__btn--active"]}">등록</button>
                </div>
            </div>


            <div todo-data="actionBtnContainer" class="${styles.todoItem__actionBtnContainer}">
                <button todo-data="eraseBtn" class="${todoList__actionBtn}">
                    <img src="${closedIcon}">
                </button>
                <button todo-data="editBtn" class="${todoList__actionBtn}">
                    <img src="${editIcon}">
                </button>
            </div>
        </div>
    `;

  const titleNode = parent.querySelector('[todo-data="title"]');
  const contentNode = parent.querySelector('[todo-data="content"]');

  // 수정 모드에서 취소, 제출 버튼
  const cancelBtnNode = parent.querySelector('[todo-data="cancelBtn"]');
  const submitBtnNode = parent.querySelector('[todo-data="submitBtn"]');

  // 뷰 모드에서 삭제, 수정 버튼
  const eraseBtnNode = parent.querySelector('[todo-data="eraseBtn"]');
  const editBtnNode = parent.querySelector('[todo-data="editBtn"]');

  const authorNode = parent.querySelector('[todo-data="author"]');
  const actionBtnContainer = parent.querySelector(
    '[todo-data="actionBtnContainer"]'
  );

  const dynamicTextAreaHeight = (element) => {
    element.addEventListener("keyup", () => {
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    });
  };

  const setEditMode = () => {
    // show & hide ui
    actionBtnContainer.style.display = "none";
    authorNode.style.display = "none";
    cancelBtnNode.style.display = "block";
    submitBtnNode.style.display = "block";

    // input 활성화
    titleNode.removeAttribute("disabled");
    contentNode.removeAttribute("disabled");
  };

  const setViewMode = () => {
    // show & hide ui
    actionBtnContainer.style.display = "block";
    authorNode.style.display = "block";
    cancelBtnNode.style.display = "none";
    submitBtnNode.style.display = "none";

    // input 비활성화
    titleNode.setAttribute("disabled", "");
    contentNode.setAttribute("disabled", "");
  };

  // 취소 버튼 클릭 시
  const onCancel = () => {
    titleNode.value = props.title;
    contentNode.value = props.content;
    setViewMode();
  };

  // 삭제 시
  const onErase = () => {
    document.dispatchEvent(
      new CustomEvent("showDeleteModal", {
        detail: {
          msg: "선택한 카드를 삭제할까요?",
          onDelete: () => {
            //TODO: 투두 삭제 로직 생성
          },
        },
      })
    );
  };

  // 수정하고 제출 시
  const onSubmit = () => {
    //TODO: 투두 등록 로직 생성
  };

  editBtnNode.addEventListener("click", setEditMode);
  cancelBtnNode.addEventListener("click", onCancel);
  eraseBtnNode.addEventListener("click", onErase);
  submitBtnNode.addEventListener("click", onSubmit);

  dynamicTextAreaHeight(titleNode);
  dynamicTextAreaHeight(contentNode);
  setViewMode();
}
