//히스토리 전체 불러오기
function getHistory() {
  const historyList = localStorage.getItem("history");
  if (historyList) return JSON.parse(historyList);

  // 없으면 새로 생성
  localStorage.setItem("history", JSON.stringify([]));
  return [];
}

// actionId = 0: 등록 / 1: 삭제 / 2: 변경 / 3: 이동

//0번 - 아이템 등록하기 히스토리 저장
function addHistory(colTitle, item) {
  const historyData = localStorage.getItem("history");
  const historyList = historyData ? JSON.parse(historyData) : [];
  // actionId = 0: 등록 / 1: 삭제 / 2: 수정 / 3: 이동
  const historyItem = {
    authorName: "멋진삼",
    timeStamp: new Date().getTime(),
    actionId: 0,
    todoTitle: item.title,
    todoSrc: colTitle,
    todoDst: null,
  };
  historyList.unshift(historyItem);
  localStorage.setItem("history", JSON.stringify(historyList));
}

//1번 - 아이템 삭제하기 히스토리 저장
function removeHistory(colTitle, item) {
  const historyData = localStorage.getItem("history");
  const historyList = historyData ? JSON.parse(historyData) : [];
  const historyItem = {
    authorName: "멋진삼",
    timeStamp: new Date().getTime(),
    actionId: 1,
    todoTitle: item.title,
    todoSrc: colTitle,
    todoDst: null,
  };
  historyList.unshift(historyItem);
  localStorage.setItem("history", JSON.stringify(historyList));
}

//2번 - 아이템 수정하기 히스토리 저장
function editHistory(item) {
  const historyList = JSON.parse(localStorage.getItem("history")) ?? [];
  const historyItem = {
    authorName: "멋진삼",
    timeStamp: new Date().getTime(),
    actionId: 2,
    todoTitle: item.title,
    todoSrc: null,
    todoDst: null,
  };

  historyList.unshift(historyItem);
  localStorage.setItem("history", JSON.stringify(historyList));
}

//3번 - 아이템 이동하기 히스토리 저장
function moveHistory(colTitleSrc, colTitleDst, todoTitle) {
  const historyList = JSON.parse(localStorage.getItem("history")) ?? [];
  const historyItem = {
    authorName: "멋진삼",
    timeStamp: new Date().getTime(),
    actionId: 3,
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
