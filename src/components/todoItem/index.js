import { store } from "../../store/todoStore";
import {
  addTodoListItem,
  editTodoListItem,
  removeTodoListItem,
} from "../../utils/API/todoList";

import {
  addCheckInput,
  dynamicTextAreaHeight,
  switchMode,
  createDeleteModal,
  detectDeviceType,
} from "./helper";

import { todoItemtemplate } from "./template";

export default function todoItem(parent, props) {
  parent.innerHTML = todoItemtemplate(props.item);

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
    titleNode.value = props.item.title;
    contentNode.value = props.item.content;
    setViewMode();
  };

  // 수정하고 제출 시
  const onSubmit_edit = () => {
    const newItem = {
      ...props.item,
      title: titleNode.value,
      content: contentNode.value,
      createdOn: detectDeviceType(),
    };

    //투두 등록 로직
    if (props.addMode) {
      const newReturnItem = addTodoListItem(props.todoColTitle, newItem);
      //추가하고 추가 컴포넌트 삭제 및
      props.onAddItem(true, newReturnItem);
    }
    //투두 수정 로직
    else {
      editTodoListItem(props.todoColTitle, newItem);
      setViewMode();
    }
    //디스패치 실행
    //payload로 행 이름과 아이템 입력해줌
    store.dispatch({
      type: "plusTodoItem",
      payload: { todoColTitle: props.todoColTitle, item: newItem },
    });
  };

  // 삭제 시
  const onErase_view = () => {
    console.log("onerase");
    createDeleteModal(parent, () => {
      removeTodoListItem(props.todoColTitle, props.item);
      parent.parentNode.removeChild(parent);
      console.log(props);
      props.onDeleteItem();
    });
  };

  ////////////////////////////////////////////////////////

  // textArea의 높이 자동 설정
  dynamicTextAreaHeight(titleNode);
  dynamicTextAreaHeight(contentNode);

  // 함수 이벤트 핸들러 추가하는 부분
  // 뷰모드 액션 버튼 핸들러 추가
  editBtnNode_view.addEventListener("click", setEditMode);
  eraseBtnNode_view.addEventListener("click", onErase_view);

  // 편집모드 버튼 핸들러 추가
  cancelBtnNode_edit.addEventListener("click", props.onCancel ?? onCancel_edit);
  submitBtnNode_edit.addEventListener("click", onSubmit_edit);

  // 투두 아이템의 초기 모드를 뷰 모드로 설정
  props.addMode ? setEditMode() : setViewMode();
}
