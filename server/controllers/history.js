const { history } = require("../model");

function getHistory() {
  return history;
}

function clearHistory() {
  history.splice(0, history.length);
}

function addHistory(colTitle, item) {
  const historyItem = {
    authorName: "멋진삼",
    timeStamp: new Date().getTime(),
    actionId: 0,
    todoTitle: item.title,
    todoSrc: colTitle,
    todoDst: null,
  };
  history.unshift(historyItem);
}

function removeHistory(colTitle, item) {
  // actionId = 0: 등록 / 1: 삭제 / 2: 변경 / 3: 이동
  const historyItem = {
    authorName: "멋진삼",
    timeStamp: new Date().getTime(),
    actionId: 1,
    todoTitle: item.title,
    todoSrc: colTitle,
    todoDst: null,
  };
  history.unshift(historyItem);
}

function editHistory(item) {
  // actionId = 0: 등록 / 1: 삭제 / 2: 변경 / 3: 이동
  const historyItem = {
    authorName: "멋진삼",
    timeStamp: new Date().getTime(),
    actionId: 2,
    todoTitle: item.title,
    todoSrc: null,
    todoDst: null,
  };
  history.unshift(historyItem);
}

function moveHistory(colTitleSrc, colTitleDst, item) {
  // actionId = 0: 등록 / 1: 삭제 / 2: 변경 / 3: 이동
  const historyItem = {
    authorName: "멋진삼",
    timeStamp: new Date().getTime(),
    actionId: 3,
    todoTitle: item.title,
    todoSrc: colTitleSrc,
    todoDst: colTitleDst,
  };
  history.unshift(historyItem);
}

module.exports = {
  getHistory,
  clearHistory,
  addHistory,
  removeHistory,
  editHistory,
  moveHistory,
};
