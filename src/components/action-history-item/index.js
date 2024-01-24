// TODO: data 받기
export function template({ actionHistory }) {
  return `
    <li class="action-history__item">
        <img
          src="./assets/icons/avatar.png"
          class="rounded-1/2"
          style="width: 40px; height: 40px"
        />
        <div class="action-history__item-description">
          <p class="display-medium14 text-default">@User</p>
          <p class="display-medium14 text-default">
            ${getActionHistoryText(actionHistory)}
          </p>
          <span class="text-weak display-medium12">${getTime(
            actionHistory.createdAt
          )}</span>
        </div>
    </li>
    `;
}

const getActionHistoryText = (actionHistory) => {
  switch (actionHistory.actionType) {
    case "ADD_TODO":
      return addHistroy(actionHistory);
    case "DELETE_TODO":
      return deleteHistroy(actionHistory);
    case "EDIT_TODO":
      return editHistroy(actionHistory);
    case "MOVE_TODO":
      return moveHistory(actionHistory);
  }
};

const moveHistory = (actionhistory) => {
  return `<strong class="display-bold14 text-bold">${actionhistory.cardTitle}</strong>을(를)
      <strong class="display-bold14 text-bold">${actionhistory.prevColumn}</strong>에서
      <strong class="display-bold14 text-bold">${actionhistory.curColumn}</strong>으로
      <strong class="display-bold14 text-bold">이동</strong>하였습니다.`;
};

const editHistroy = (actionhistory) => {
  return `<strong class="display-bold14 text-bold">${actionhistory.cardTitle}</strong>을(를)
      <strong class="display-bold14 text-bold">변경</strong>하였습니다.`;
};

const deleteHistroy = (actionhistory) => {
  return `<strong class="display-bold14 text-bold">${actionhistory.cardTitle}</strong>을(를)
      <strong class="display-bold14 text-bold">${actionhistory.curColumn}</strong>에서
      <strong class="display-bold14 text-bold">삭제</strong>하였습니다.`;
};
const addHistroy = (actionhistory) => {
  return `<strong class="display-bold14 text-bold">${actionhistory.cardTitle}</strong>을(를)
      <strong class="display-bold14 text-bold">${actionhistory.curColumn}</strong>에
      <strong class="display-bold14 text-bold">등록</strong>하였습니다.`;
};

const getTime = (createdAt) => {
  const seconds = Math.floor((new Date().getTime() - createdAt) / 1000);
  const intervals = [
    { label: "년", value: 31536000 },
    { label: "개월", value: 2592000 },
    { label: "일", value: 86400 },
    { label: "시간", value: 3600 },
    { label: "분", value: 60 },
    { label: "초", value: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.value);
    if (count >= 1) {
      return `${count}${interval.label} 전`;
    }
  }

  return "방금 전";
};
