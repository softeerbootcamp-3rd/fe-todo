export function getIndexById(list, id) {
  if (id === undefined) return list.length;
  return list.findIndex((item) => item.id === id);
}

export function deepEqualList(listA, listB) {
  if (listA === undefined && listB === undefined) return true;
  if (listA === undefined || listB === undefined) return false;
  if (listA.length !== listB.length) return false;
  return listA.every((a, i) => {
    const b = listB[i];
    if (a !== b) return false;
    return true;
  });
}

export function findItemFromTodoList(item, todoList) {
  for (const title of Object.keys(todoList)) {
    const idx = getIndexById(todoList[title], item.id);
    return { title, i: idx };
  }
}
