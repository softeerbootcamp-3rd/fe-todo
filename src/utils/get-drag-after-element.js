export const getDragAfterElement = ({ draggableElements, y }) => {
  return [...draggableElements].reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offsetY = y - box.top - box.height / 2;

      if (offsetY < 0 && offsetY > closest.offset) {
        return { offset: offsetY, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};
