export async function getHistory() {
  const historyList = localStorage.getItem("history");
  if (historyList !== null) return JSON.parse(historyList);

  // 없으면 새로 생성
  localStorage.setItem("history", JSON.stringify([]));
  return [];
}
