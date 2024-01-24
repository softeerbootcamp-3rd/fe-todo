export const getColumnList = (columnId) => {
  return [...document.querySelector(`#${columnId}-list`).children];
};
