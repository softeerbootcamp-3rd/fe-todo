import { store } from "../store/todoStore";

export function applyDragAndDrop(draggables, containers) {
  // 컨테이너 높이 동일하게 설정
  const maxHeight = Array.from(containers).reduce((max, container) => {
    const height = container.getBoundingClientRect().height;
    return height > max ? height : max;
  }, 0);

  containers.forEach((container) => {
    container.style.height = `${maxHeight}px`;
  });

  let todoColTitleSrc, startColIndex;
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", ({ target }) => {
      const childrenNodeArr = Array.from(target.parentNode.children);
      todoColTitleSrc = target.parentNode.id;
      startColIndex = childrenNodeArr.indexOf(target) - 1;
      draggable.classList.add("dragging");
      draggable.style.opacity = 0.4;
    });

    draggable.addEventListener("dragend", ({ target }) => {
      //자식 노드 객체를 배열로 바꿈.
      const childrenNodeArr = Array.from(target.parentNode.children);

      const todoColTitleDst = target.parentNode.id;
      const endColIndex = childrenNodeArr.indexOf(target) - 1;
      store.dispatch({
        type: "moveTodoItem",
        payload: {
          todoTitle: target.id,
          startColIndex: startColIndex,
          todoColTitleSrc: todoColTitleSrc.replace("todoCol_", ""),
          endColIndex: endColIndex,
          todoColTitleDst: todoColTitleDst.replace("todoCol_", ""),
        },
      });

      draggable.classList.remove("dragging");
      draggable.style.opacity = 1;
    });
  });

  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElement === null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    });
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll("[todo-data='todoItem']:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
