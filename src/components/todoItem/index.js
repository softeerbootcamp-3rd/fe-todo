import styles from "./todoItem.module.scss";
import closedIcon from "../../asset/img/closed.svg";
import editIcon from "../../asset/img/edit.svg";
import {
  addCheckInput,
  dynamicTextAreaHeight,
  switchMode,
  createDeleteModal,
  requestUpdateItemCount,
  getClosestElement,
} from "./helper";
import { todoStore } from "../../stores/todoStore";
import { getIndexById } from "../../utils/list";
import { useStore } from "../../utils/store.js";

/*
  {
    addMode: true 일 경우 추가 모드
    listTitle: 투두 리스트 컬럼 제목(키)
    id: 투두 아이템 인덱스
  }
*/
export default function todoItem(renderTarget, initialData) {
  const views = mount(renderTarget, initialData);
  const store = attachStore(views, initialData);
  attachHandlers(views, store, initialData);
  return store.destroy;
}

function attachStore(
  { titleNode, contentNode, authorByNode_view, setViewMode },
  initialData
) {
  // dont subscribe if add mode
  if (initialData.addMode) return { state: todoStore.getState() };

  // state가 업데이트 될때마다 뷰 업데이트
  const updateView = (item) => {
    if (item === undefined) return;
    titleNode.value = item.title;
    contentNode.value = item.content;
    authorByNode_view.innerText = `author by ${item.createdOn}`;
    setViewMode();
  };

  const store = useStore(todoStore, updateView, (state) => {
    const list = state.todoList[initialData.listTitle];
    const i = getIndexById(list, initialData.id);
    return list[i];
  });

  return store;
}

function attachHandlers(
  {
    renderTarget,
    todoItem,
    titleNode,
    contentNode,
    eraseBtnNode_view,
    editBtnNode_view,
    cancelBtnNode_edit,
    submitBtnNode_edit,
    setViewMode,
    setEditMode,
  },
  { data, state },
  initialData
) {
  // 취소 버튼 클릭 시 기존 data로 롤백
  const onCancel_edit = () => {
    titleNode.value = data.title;
    contentNode.value = data.content;
    setViewMode();
  };

  // 수정/등록 하고 제출 시
  const onSubmit_edit = () => {
    const newItem = {
      ...data,
      title: titleNode.value,
      content: contentNode.value,
      createdOn: "web",
    };

    if (initialData.addMode) {
      state.add(initialData.listTitle, newItem);
      initialData.onCancel();
    } else {
      state.edit(initialData.listTitle, newItem);
    }
  };

  // 삭제 시
  const onErase_view = () => {
    createDeleteModal(renderTarget, () => {
      state.remove(initialData.listTitle, data);
    });
  };

  // textArea의 높이 자동 설정
  dynamicTextAreaHeight(titleNode);
  dynamicTextAreaHeight(contentNode);
  // input validation
  addCheckInput([titleNode, contentNode], submitBtnNode_edit);
  // 뷰모드 액션 버튼
  editBtnNode_view.addEventListener("click", setEditMode);
  eraseBtnNode_view.addEventListener("click", onErase_view);
  // 편집모드 버튼
  cancelBtnNode_edit.addEventListener(
    "click",
    initialData.onCancel ?? onCancel_edit
  );
  submitBtnNode_edit.addEventListener("click", onSubmit_edit);

  // 드래그 이벤트 처리 (생성 모드 제외)
  if (!initialData.addMode) {
    enableDrag({ renderTarget, todoItem }, { data }, initialData);
  }
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
      ></textarea>
      <textarea
        type="text"
        rows="1"
        data-node="content"
        class="${styles.todoItem__itemContent}"
        placeholder="내용을 입력하세요"
      ></textarea>
      <div class="${styles.todoItem__bottomContainer}">
        <p data-node="author" class="${styles.todoItem__itemAuthor}">
          
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

  // 초기 모드 설정
  if (initialData?.addMode) setEditMode();
  else setViewMode();

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
    setViewMode,
    setEditMode,
  };
}

function enableDrag({ renderTarget, todoItem }, { data }, initialData) {
  //todo: store 사용하도록 수정해야함
  renderTarget.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        ...data,
        listTitle: initialData.listTitle,
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
    //TODO: implement this using store
    //requestUpdateItemCount(renderTarget, true);
  });
}
