export function getIndexById(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) return i;
  }
  return undefined;
}

export function deepEqualList(listA, listB) {
  if (listA === undefined && listB === undefined) return true;
  if (listA === undefined || listB === undefined) return false;
  if (listA.length !== listB.length) return false;
  for (let i = 0; i < listA.length; i++) {
    const a = listA[i];
    const b = listB[i];
    if (a !== b) return false;
  }
  return true;
}

export function findItemFromTodoList(item, todoList) {
  for (const title of Object.keys(todoList)) {
    for (let i = 0; i < todoList[title].length; i++) {
      if (todoList[title][i].id === item.id) {
        return { title, i };
      }
    }
  }
}
