const { todo } = require("../model");
const { getIndexById } = require("../utils");
const {
  moveHistory,
  removeHistory,
  addHistory,
  editHistory,
} = require("./history");

let idCount = 1000;
const insert_after = "after";
const insert_before = "before";

function getTodoList() {
  return todo;
}

function addTodoListItem(title, item) {
  const newItem = { ...item, id: ++idCount };
  todo[title]?.unshift(newItem);
  addHistory(title, newItem);
  return newItem;
}

function findAndRemoveItem(list, id) {
  for (let idx = 0; idx < list.length; idx++) {
    if (list[idx].id === id) {
      return list.splice(idx, 1)[0];
    }
  }
}

function removeTodoListItem(colTitle, id) {
  const item = findAndRemoveItem(todo[colTitle], id);
  removeHistory(colTitle, item);
}

function editTodoListItem(colTitle, item) {
  for (let idx = 0; idx < todo[colTitle].length; idx++) {
    if (todo[colTitle][idx].id === item.id) {
      todo[colTitle][idx] = item;
      break;
    }
  }
  editHistory(item);
  return item;
}

function moveTodoListItem(titleSrc, idSrc, titleDst, idDst, position) {
  const listSrc = todo[titleSrc];
  const listDst = todo[titleDst];
  const idxSrc = getIndexById(listSrc, idSrc);
  const idxDst =
    getIndexById(listDst, idDst) + (position === insert_after ? 1 : 0);
  const item = listSrc[idxSrc];

  if (titleSrc === titleDst) {
    // 인덱스가 큰거부터 수정
    if (idxSrc < idxDst) {
      listSrc.splice(idxDst, 0, item);
      listSrc.splice(idxSrc, 1);
    } else {
      listSrc.splice(idxSrc, 1);
      listSrc.splice(idxDst, 0, item);
    }
    todo[titleSrc] = listSrc;
  } else {
    listSrc.splice(idxSrc, 1);
    listDst.splice(idxDst, 0, item);
    todo[titleSrc] = listSrc;
    todo[titleDst] = listDst;
  }
  moveHistory(titleSrc, titleDst, item);
}

module.exports = {
  getTodoList,
  addTodoListItem,
  removeTodoListItem,
  editTodoListItem,
  moveTodoListItem,
};
