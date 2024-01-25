import styles from "./todoItem.module.scss";
import closedIcon from "../../asset/img/closed.svg";
import editIcon from "../../asset/img/edit.svg";
import {
  addCheckInput,
  dynamicTextAreaHeight,
  switchMode,
  createDeleteModal,
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
  return () => {
    store.item?.destroy();
    store.drag?.destroy();
  };
}

function attachStore(
  { todoItem, titleNode, contentNode, authorByNode, setViewMode },
  initialData
) {
  // dont subscribe if add mode
  if (initialData.addMode)
    return { itemStore: { state: todoStore.getState() } };

  // state가 업데이트 될때마다 뷰 업데이트
  const updateView = (item) => {
    if (item === undefined) return;
    titleNode.value = item.title;
    contentNode.value = item.content;
    authorByNode.innerText = `author by ${item.createdOn}`;
    setViewMode();
  };

  // subscribe to item updates
  const itemStore = useStore(todoStore, updateView, (state) => {
    const list = state.todoList[initialData.listTitle];
    const i = getIndexById(list, initialData.id);
    const item = list[i];
    return item;
  });

  // subscribe to drag status
  const dragStore = useStore(
    todoStore,
    (drag) => {
      const dragging = drag?.src.id === initialData.id;
      if (dragging) todoItem.classList.add(styles["todoItem--dragging"]);
      else todoItem.classList.remove(styles["todoItem--dragging"]);
    },
    (state) => state.drag
  );

  return { itemStore, dragStore };
}

function attachHandlers(
  {
    renderTarget,
    titleNode,
    contentNode,
    eraseBtnNode,
    editBtnNode,
    cancelBtnNode,
    submitBtnNode,
    setViewMode,
    setEditMode,
  },
  { itemStore, dragStore },
  initialData
) {
  // 취소 버튼 클릭 시 기존 data로 롤백
  const onEditCancel = () => {
    titleNode.value = itemStore.data.title;
    contentNode.value = itemStore.data.content;
    setViewMode();
  };

  // 수정/등록 하고 제출 시
  const onEditSubmit = () => {
    const newItem = {
      ...itemStore?.data,
      title: titleNode.value,
      content: contentNode.value,
      createdOn: "web",
    };

    if (initialData.addMode) {
      itemStore.state.add(initialData.listTitle, newItem);
      initialData.onCancel();
    } else {
      itemStore.state.edit(initialData.listTitle, newItem);
    }
  };

  // 삭제 시
  const onErase = () => {
    createDeleteModal(renderTarget, () => {
      itemStore.state.remove(initialData.listTitle, itemStore.data);
    });
  };

  // textArea의 높이 자동 설정
  dynamicTextAreaHeight(titleNode);
  dynamicTextAreaHeight(contentNode);
  // input validation
  addCheckInput([titleNode, contentNode], submitBtnNode);
  // 뷰모드 액션 버튼
  editBtnNode.addEventListener("click", setEditMode);
  eraseBtnNode.addEventListener("click", onErase);
  // 편집모드 버튼
  cancelBtnNode.addEventListener("click", initialData.onCancel ?? onEditCancel);
  submitBtnNode.addEventListener("click", onEditSubmit);

  // 드래그 이벤트 처리 (생성 모드 제외)
  if (!initialData.addMode) {
    enableDrag({ renderTarget }, { dragStore }, initialData);
  }
}

// todoItem 컴포넌트 템플릿
function mount(renderTarget, initialData) {
  renderTarget.innerHTML = /*html*/ `
  <div data-node="todoItem" data-todo-id="${
    initialData.id
  }" data-todo-list-title="${initialData.listTitle}" class="${
    styles.todoItem
  }" ${initialData?.addMode ? "" : 'draggable="true"'}>
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
  const eraseBtnNode = renderTarget.querySelector('[data-node="eraseBtn"]');
  const editBtnNode = renderTarget.querySelector('[data-node="editBtn"]');
  const authorByNode = renderTarget.querySelector('[data-node="author"]');
  const actionBtnContainer = renderTarget.querySelector(
    '[data-node="actionBtnContainer"]'
  );
  const cancelBtnNode = renderTarget.querySelector('[data-node="cancelBtn"]');
  const submitBtnNode = renderTarget.querySelector('[data-node="submitBtn"]');

  // 편집 모드 진입시 ui 수정
  const setEditMode = () =>
    switchMode({
      block: [cancelBtnNode, submitBtnNode],
      none: [authorByNode, actionBtnContainer],
      enable: [titleNode, contentNode],
    });

  // 뷰 모드 진입시 ui 수정
  const setViewMode = () =>
    switchMode({
      block: [actionBtnContainer, authorByNode],
      none: [cancelBtnNode, submitBtnNode],
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
    eraseBtnNode,
    editBtnNode,
    authorByNode,
    actionBtnContainer,
    cancelBtnNode,
    submitBtnNode,
    setViewMode,
    setEditMode,
  };
}

function enableDrag({ renderTarget }, { dragStore }, initialData) {
  renderTarget.addEventListener("dragstart", (e) => {
    dragStore.state.startDrag(initialData.listTitle, initialData.id);
    e.dataTransfer.dropEffect = "move";
  });

  let count = 0;
  renderTarget.addEventListener("dragenter", (e) => {
    e.preventDefault();
    if (count++ === 0) {
      const idSrc = dragStore.data.src.id;
      const titleSrc = dragStore.data.dst?.title ?? dragStore.data.src.title;
      console.log("src info", idSrc, titleSrc);
      if (idSrc === initialData.id) return;
      dragStore.state.doDrag(
        titleSrc,
        idSrc,
        initialData.listTitle,
        initialData.id
      );
    }
  });

  renderTarget.addEventListener("drop", () => {
    count = 0;
  });

  renderTarget.addEventListener("dragleave", (e) => {
    e.preventDefault();
    count--;
  });

  renderTarget.addEventListener("dragend", () => {
    dragStore.state.applyDrag();
  });
}

//TODO: refactor this
