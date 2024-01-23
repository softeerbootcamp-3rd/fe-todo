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

export default function todoItem(renderTarget, initialData) {
  const views = mount(renderTarget, initialData);
  attachHandlers(views, initialData);
}

function attachHandlers(
  {
    renderTarget,
    todoItem,
    titleNode,
    contentNode,
    eraseBtnNode_view,
    editBtnNode_view,
    authorByNode_view,
    actionBtnContainer_view,
    cancelBtnNode_edit,
    submitBtnNode_edit,
  },
  initialData
) {
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
    titleNode.value = initialData.item.title;
    contentNode.value = initialData.item.content;
    setViewMode();
  };

  // 수정/등록 하고 제출 시
  const onSubmit_edit = () => {
    const newItem = {
      ...initialData.item,
      title: titleNode.value,
      content: contentNode.value,
      createdOn: "web",
    };

    //투두 등록 로직
    if (initialData.addMode) {
      const newReturnItem = addTodoListItem(initialData.todoColTitle, newItem);
      //추가하고 추가 컴포넌트 삭제 및
      initialData.createAndAddItem(newReturnItem);
    }

    //투두 수정 로직
    else {
      editTodoListItem(initialData.todoColTitle, newItem);
      setViewMode();
    }
  };

  // 삭제 시
  const onErase_view = () => {
    createDeleteModal(renderTarget, () => {
      removeTodoListItem(initialData.todoColTitle, initialData.item);
      const parentNode = renderTarget.parentNode;
      renderTarget.parentNode.removeChild(renderTarget);
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
  cancelBtnNode_edit.addEventListener(
    "click",
    initialData.onCancel ?? onCancel_edit
  );
  submitBtnNode_edit.addEventListener("click", onSubmit_edit);

  // 드래그 이벤트 처리 (생성 카드 제외)
  if (!initialData.addMode) {
    renderTarget.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          ...initialData.item,
          todoColTitle: initialData.todoColTitle,
        })
      );
      e.dataTransfer.dropEffect = "move";
      todoItem.classList.add(styles["todoItem--dragging"]);
    });

    renderTarget.addEventListener("dragend", (e) => {
      e.preventDefault();
      todoItem.classList.remove(styles["todoItem--dragging"]);
      requestUpdateItemCount(renderTarget, true);
    });

    renderTarget.addEventListener("dragover", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const elem = getClosestElement(
        [...renderTarget.parentNode.querySelectorAll(`[data-node="todoItem"]`)],
        e.clientY
      );
      const dragging = document.querySelector(
        `div.${styles["todoItem--dragging"]}`
      ).parentNode;
      renderTarget.parentNode.insertBefore(dragging, elem?.parentNode);
      requestUpdateItemCount(renderTarget, true);
    });
  }

  // 투두 아이템의 초기 모드를 뷰 모드로 설정
  if (initialData.addMode) setEditMode();
  else setViewMode();
}

// todoItem 컴포넌트 템플릿
function mount(renderTarget, initialData) {
  renderTarget.innerHTML = /*html*/ `
  <div data-node="todoItem" class="${styles.todoItem}" ${
    initialData?.addMode ? "" : 'draggable="true"'
  }>
    <div>
      <textarea
        type="text"
        rows="1"
        data-node="title"
        class="${styles.todoItem__itemTitle}"
        placeholder="제목을 입력하세요"
      >${initialData.item?.title ?? ""}</textarea>
      <textarea
        type="text"
        rows="1"
        data-node="content"
        class="${styles.todoItem__itemContent}"
        placeholder="내용을 입력하세요"
      >${initialData.item?.content ?? ""}</textarea>
      <div class="${styles.todoItem__bottomContainer}">
        <p data-node="author" class="${styles.todoItem__itemAuthor}">
          author by ${initialData.item?.createdOn}
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
          ${initialData?.addMode ? "등록" : "저장"}
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

  const todoItem = renderTarget.querySelector('[data-node="todoItem"]');
  const titleNode = renderTarget.querySelector('[data-node="title"]');
  const contentNode = renderTarget.querySelector('[data-node="content"]');
  const eraseBtnNode_view = renderTarget.querySelector(
    '[data-node="eraseBtn"]'
  );
  const editBtnNode_view = renderTarget.querySelector('[data-node="editBtn"]');
  const authorByNode_view = renderTarget.querySelector('[data-node="author"]');
  const actionBtnContainer_view = renderTarget.querySelector(
    '[data-node="actionBtnContainer"]'
  );
  const cancelBtnNode_edit = renderTarget.querySelector(
    '[data-node="cancelBtn"]'
  );
  const submitBtnNode_edit = renderTarget.querySelector(
    '[data-node="submitBtn"]'
  );

  return {
    renderTarget,
    todoItem,
    titleNode,
    contentNode,
    eraseBtnNode_view,
    editBtnNode_view,
    authorByNode_view,
    actionBtnContainer_view,
    cancelBtnNode_edit,
    submitBtnNode_edit,
  };
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
