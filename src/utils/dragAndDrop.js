export function applyDragAndDrop(draggables, containers) {
  // 컨테이너 높이 동일하게 설정
  const maxHeight = Array.from(containers).reduce((max, container) => {
    const height = container.getBoundingClientRect().height;
    return height > max ? height : max;
  }, 0);

  containers.forEach((container) => {
    container.style.height = `${maxHeight}px`;
  });

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
      draggable.style.opacity = 0.4;
    });

    draggable.addEventListener("dragend", () => {
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
