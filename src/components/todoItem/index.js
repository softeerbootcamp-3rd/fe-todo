import styles from "./todoItem.module.scss";
import closedIcon from "../../asset/img/closed.svg";
import editIcon from "../../asset/img/edit.svg";
import {
  addCheckInput,
  dynamicTextAreaHeight,
  switchMode,
  createDeleteModal,
} from "./helper";

export default function todoItem(parent, props) {
  parent.innerHTML = template(props);

  // 입력 제목, 내용 노드
  const titleNode = parent.querySelector('[todo-data="title"]');
  const contentNode = parent.querySelector('[todo-data="content"]');

  // 뷰 모드에서만 보이는 삭제, 수정 버튼
  const eraseBtnNode_view = parent.querySelector('[todo-data="eraseBtn"]');
  const editBtnNode_view = parent.querySelector('[todo-data="editBtn"]');
  // author by [어디서 썼는지]
  const authorByNode_view = parent.querySelector('[todo-data="author"]');
  // 우측에 있는 작은 액션 버튼들의 컨테이너
  const actionBtnContainer_view = parent.querySelector(
    '[todo-data="actionBtnContainer"]'
  );

  // 수정 모드에서만 보이는 취소, 제출 버튼
  const cancelBtnNode_edit = parent.querySelector('[todo-data="cancelBtn"]');
  const submitBtnNode_edit = parent.querySelector('[todo-data="submitBtn"]');

  // input에 입력이 될때마다 checkInput
  addCheckInput([titleNode, contentNode], submitBtnNode_edit);

  // 편집 모드 진입시 ui 수정
  const setEditMode = () =>
    switchMode({
      block: [cancelBtnNode_edit, submitBtnNode_edit],
      none: [authorByNode_view, actionBtnContainer_view],
      enable: [titleNode, contentNode],
    });

  // 뷰 모드 진입시 ui 수정
  const setViewMode = () =>
    switchMode({
      block: [actionBtnContainer_view, authorByNode_view],
      none: [cancelBtnNode_edit, submitBtnNode_edit],
      disable: [titleNode, contentNode],
    });

  ////////////////////////////////////////////////////////
  //필요 함수 선언 부분
  // 취소 버튼 클릭 시
  const onCancel_edit = () => {
    titleNode.value = props.title;
    contentNode.value = props.content;
    setViewMode();
  };

  // 수정하고 제출 시
  const onSubmit_edit = () => {
    //TODO: 투두 등록 로직 생성
  };

  // 삭제 시
  const onErase_view = () => {
    createDeleteModal(parent, () => {
      console.log("erase");
    });
  };

  ////////////////////////////////////////////////////////

  // 함수 이벤트 핸들러 추가하는 부분
  // 뷰모드 액션 버튼 핸들러 추가
  editBtnNode_view.addEventListener("click", setEditMode);
  eraseBtnNode_view.addEventListener("click", onErase_view);

  // 편집모드 버튼 핸들러 추가
  cancelBtnNode_edit.addEventListener("click", onCancel_edit);
  submitBtnNode_edit.addEventListener("click", onSubmit_edit);

  // textArea의 높이 자동 설정
  dynamicTextAreaHeight(titleNode);
  dynamicTextAreaHeight(contentNode);

  // 투두 아이템의 초기 모드를 뷰 모드로 설정
  setViewMode();
}

// todoItem 컴포넌트 템플릿
function template(props) {
  return `
  <div class="${styles.todoItem}">
    <div>
      <textarea
        type="text"
        rows="1"
        todo-data="title"
        class="${styles.todoItem__itemTitle}"
        placeholder="제목을 입력하세요"
      >${props.title}</textarea>
      <textarea
        type="text"
        rows="1"
        todo-data="content"
        class="${styles.todoItem__itemContent}"
        placeholder="내용을 입력하세요"
      >${props.content}</textarea>
      <div class="${styles.todoItem__bottomContainer}">
        <p todo-data="author" class="${styles.todoItem__itemAuthor}">
          author by ${props.createdOn}
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
        >
          등록
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
