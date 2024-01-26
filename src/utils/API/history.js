//히스토리 전체 불러오기
function getHistory() {
  const historyList = localStorage.getItem("history");
  if (historyList) return JSON.parse(historyList);

  // 없으면 새로 생성
  localStorage.setItem("history", JSON.stringify([]));
  return [];
}

// 아이템 등록하기 히스토리 저장
function addHistory(colTitle, item) {
  const historyData = localStorage.getItem("history");
  const historyList = historyData ? JSON.parse(historyData) : [];
  const historyItem = {
    authorName: "멋진삼",
    timeStamp: new Date().getTime(),
    actionKind: "등록",
    todoTitle: item.title,
    todoSrc: colTitle,
    todoDst: null,
  };
  historyList.unshift(historyItem);
  localStorage.setItem("history", JSON.stringify(historyList));
}

// 아이템 삭제하기 히스토리 저장
function removeHistory(colTitle, item) {
  const historyData = localStorage.getItem("history");
  const historyList = historyData ? JSON.parse(historyData) : [];
  const historyItem = {
    authorName: "멋진삼",
    timeStamp: new Date().getTime(),
    actionKind: "삭제",
    todoTitle: item.title,
    todoSrc: colTitle,
    todoDst: null,
  };
  historyList.unshift(historyItem);
  localStorage.setItem("history", JSON.stringify(historyList));
}

// 아이템 수정하기 히스토리 저장
function editHistory(item) {
  const historyList = JSON.parse(localStorage.getItem("history")) ?? [];
  const historyItem = {
    authorName: "멋진삼",
    timeStamp: new Date().getTime(),
    actionKind: "수정",
    todoTitle: item.title,
    todoSrc: null,
    todoDst: null,
  };

  historyList.unshift(historyItem);
  localStorage.setItem("history", JSON.stringify(historyList));
}

// 아이템 이동하기 히스토리 저장
function moveHistory(colTitleSrc, colTitleDst, todoTitle) {
  const historyList = JSON.parse(localStorage.getItem("history")) ?? [];
  const historyItem = {
    authorName: "멋진삼",
    timeStamp: new Date().getTime(),
    actionKind: "이동",
    todoTitle: todoTitle,
    todoSrc: colTitleSrc,
    todoDst: colTitleDst,
  };
  historyList.unshift(historyItem);
  localStorage.setItem("history", JSON.stringify(historyList));
}

// 모든 히스토리를 초기화하는 함수
function moveAllHistory() {
  localStorage.setItem("history", []);
}

export {
  getHistory,
  addHistory,
  removeHistory,
  editHistory,
  moveHistory,
  moveAllHistory,
};
