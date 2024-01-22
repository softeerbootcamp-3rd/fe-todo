import styles from "./todoItem.module.scss";
import closedIcon from "../../asset/img/closed.svg";
import editIcon from "../../asset/img/edit.svg";
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
} from "./helper";

export default function todoItem(target, data) {
  target.innerHTML = template(data);
  controller(target, data);
}

function controller(target, data) {
  const todoItem = target.querySelector('[data-node="todoItem"]');

  // 입력 제목, 내용 노드
  const titleNode = target.querySelector('[data-node="title"]');
  const contentNode = target.querySelector('[data-node="content"]');

  // 뷰 모드에서만 보이는 삭제, 수정 버튼
  const eraseBtnNode_view = target.querySelector('[data-node="eraseBtn"]');
  const editBtnNode_view = target.querySelector('[data-node="editBtn"]');
  // author by [어디서 썼는지]
  const authorByNode_view = target.querySelector('[data-node="author"]');
  // 우측에 있는 작은 액션 버튼들의 컨테이너
  const actionBtnContainer_view = target.querySelector(
    '[data-node="actionBtnContainer"]'
  );

  // 수정 모드에서만 보이는 취소, 제출 버튼
  const cancelBtnNode_edit = target.querySelector('[data-node="cancelBtn"]');
  const submitBtnNode_edit = target.querySelector('[data-node="submitBtn"]');

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
  // 필요 함수 선언 부분
  // 취소 버튼 클릭 시
  const onCancel_edit = () => {
    titleNode.value = data.item.title;
    contentNode.value = data.item.content;
    setViewMode();
  };

  // 수정/등록 하고 제출 시
  const onSubmit_edit = () => {
    const newItem = {
      ...data.item,
      title: titleNode.value,
      content: contentNode.value,
      createdOn: "web",
    };

    //투두 등록 로직
    if (data.addMode) {
      const newReturnItem = addTodoListItem(data.todoColTitle, newItem);
      //추가하고 추가 컴포넌트 삭제 및
      data.createAndAddItem(newReturnItem);
    }

    //투두 수정 로직
    else {
      editTodoListItem(data.todoColTitle, newItem);
      setViewMode();
    }
  };

  // 삭제 시
  const onErase_view = () => {
    createDeleteModal(target, () => {
      removeTodoListItem(data.todoColTitle, data.item);
      const parentNode = target.parentNode;
      target.parentNode.removeChild(target);
      requestUpdateItemCount(parentNode);
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
  cancelBtnNode_edit.addEventListener("click", data.onCancel ?? onCancel_edit);
  submitBtnNode_edit.addEventListener("click", onSubmit_edit);

  // 드래그 이벤트 처리 (생성 카드 제외)
  if (!data.addMode) {
    target.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({ ...data.item, todoColTitle: data.todoColTitle })
      );
      e.dataTransfer.dropEffect = "move";
      todoItem.classList.add(styles["todoItem--dragging"]);
    });

    target.addEventListener("dragend", (e) => {
      e.preventDefault();
      todoItem.classList.remove(styles["todoItem--dragging"]);
      requestUpdateItemCount(target, true);
    });

    target.addEventListener("dragover", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const elem = getClosestElement(
        [...target.parentNode.querySelectorAll(`[data-node="todoItem"]`)],
        e.clientY
      );
      const dragging = document.querySelector(
        `div.${styles["todoItem--dragging"]}`
      ).parentNode;
      target.parentNode.insertBefore(dragging, elem?.parentNode);
      requestUpdateItemCount(target, true);
    });
  }

  // 투두 아이템의 초기 모드를 뷰 모드로 설정
  if (data.addMode) setEditMode();
  else setViewMode();
}

// todoItem 컴포넌트 템플릿
function template(data) {
  return /*html*/ `
  <div data-node="todoItem" class="${styles.todoItem}" ${
    data?.addMode ? "" : 'draggable="true"'
  }>
    <div>
      <textarea
        type="text"
        rows="1"
        data-node="title"
        class="${styles.todoItem__itemTitle}"
        placeholder="제목을 입력하세요"
      >${data.item?.title ?? ""}</textarea>
      <textarea
        type="text"
        rows="1"
        data-node="content"
        class="${styles.todoItem__itemContent}"
        placeholder="내용을 입력하세요"
      >${data.item?.content ?? ""}</textarea>
      <div class="${styles.todoItem__bottomContainer}">
        <p data-node="author" class="${styles.todoItem__itemAuthor}">
          author by ${data.item?.createdOn}
        </p>
        <button
          data-node="cancelBtn"
          class="${styles["todoItem__btn--inactive"]}"
        >
          취소
        </button>
        <button
          data-node="submitBtn"
          class="${styles["todoItem__btn--active"]}"
          disabled
        >
          ${data?.addMode ? "등록" : "저장"}
        </button>
      </div>
    </div>

    <div
      data-node="actionBtnContainer"
      class="${styles.todoItem__actionBtnContainer}"
    >
      <button data-node="eraseBtn" class="actionBtn">
        <img class="actionBtn__closed" src="${closedIcon}" />
      </button>
      <button data-node="editBtn" class="actionBtn">
        <img src="${editIcon}" />
      </button>
    </div>
  </div>
`;
}

function getClosestElement(elements, y) {
  return elements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      // console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function requestUpdateItemCount(target, propagate) {
  target.dispatchEvent(
    new CustomEvent("updateItemCount", { bubbles: true, detail: { propagate } })
  );
}
