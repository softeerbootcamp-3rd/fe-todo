export function getHistory() {
  const historyList = localStorage.getItem("history");
  if (historyList !== null) return JSON.parse(historyList);

  // 없으면 새로 생성
  localStorage.setItem("history", JSON.stringify([]));
  return [];
}

export function addHistory(colTitle, item) {
  const historyList = JSON.parse(localStorage.getItem("history")) ?? [];
  // actionId = 0: 등록 / 1: 삭제 / 2: 변경 / 3: 이동
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

export function removeHistory(colTitle, item) {
  const historyList = JSON.parse(localStorage.getItem("history")) ?? [];
  // actionId = 0: 등록 / 1: 삭제 / 2: 변경 / 3: 이동
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

export function editHistory(item) {
  const historyList = JSON.parse(localStorage.getItem("history")) ?? [];
  // actionId = 0: 등록 / 1: 삭제 / 2: 변경 / 3: 이동
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

export function moveHistory(colTitleSrc, colTitleDst, item) {
  const historyList = JSON.parse(localStorage.getItem("history")) ?? [];
  // actionId = 0: 등록 / 1: 삭제 / 2: 변경 / 3: 이동
  const historyItem = {
    authorName: "멋진삼",
    timeStamp: new Date().getTime(),
    actionId: 3,
    todoTitle: item.title,
    todoSrc: colTitleSrc,
    todoDst: colTitleDst,
  };

  historyList.unshift(historyItem);
  localStorage.setItem("history", JSON.stringify(historyList));
}
