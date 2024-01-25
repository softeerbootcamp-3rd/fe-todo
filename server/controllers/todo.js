const { todo } = require("../model");
const { getIndexById } = require("../utils");

let idCount = 0;
const insert_after = "after";
const insert_before = "before";

function getTodoList() {
  return todo;
}

function addTodoListItem(title, item) {
  const newItem = { ...item, id: ++idCount };
  todo[title]?.unshift(newItem);
  // addHistory(title, newItem);
  return newItem;
}

function removeTodoListItem(colTitle, id) {
  for (let idx = 0; idx < todo[colTitle].length; idx++) {
    if (todo[colTitle][idx].id === id) {
      todo[colTitle].splice(idx, 1);
      break;
    }
  }
  // removeHistory(colTitle, item);
}

function editTodoListItem(colTitle, item) {
  for (let idx = 0; idx < todo[colTitle].length; idx++) {
    if (todo[colTitle][idx].id === item.id) {
      todo[colTitle][idx] = item;
      break;
    }
  }
  // editHistory(item);
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
  // moveHistory(titleSrc, titleDst, item);
}

module.exports = {
  getTodoList,
  addTodoListItem,
  removeTodoListItem,
  editTodoListItem,
  moveTodoListItem,
};
