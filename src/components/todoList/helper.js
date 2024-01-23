import todoItem from "../todoItem";

export function createAndMountItem(
  item,
  beforeElement,
  newItemContainer,
  todoColTitle
) {
  const todoItemWrapper = document.createElement("div");
  todoItem(todoItemWrapper, {
    todoColTitle,
    item,
    createAndAddItem,
  });
  if (beforeElement === undefined) {
    // 새로운 아이템 등록 및 추가
    newItemContainer.insertAdjacentElement("afterend", todoItemWrapper);
    newItemContainer.style.display = "none";
    updateItemCount();
  } else {
    beforeElement.insertAdjacentElement("beforebegin", todoItemWrapper);
  }
}
