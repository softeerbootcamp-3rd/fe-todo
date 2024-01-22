import styles from "./todoHistoryItem.module.scss";
import userImage from "../../asset/img/userImage.png";
export default function todoHistoryItem(target, data) {
  target.innerHTML = template(target, data);
}

function template(target, data) {
  return /*html*/ `
    <div class="${styles.todoHistoryItem}">
      <img class="${
        styles.todoHistoryItem__userImage
      }" src="${userImage}"></img>
      <div class="${styles.todoHistoryItem__contentContainer}">
        <p class="${styles.todoHistoryItem__author}">@${data.authorName}</p>
        <p class="${styles.todoHistoryItem__content}">${formatHistoryText(
    data
  )}</p>
        <p class="${styles.todoHistoryItem__timeStamp}">${data.timeStamp}</p>
      </div>
    </div>
  `;
}

function formatHistoryText(data) {
  // actionId = 0: 등록 / 1: 삭제 / 2: 변경 / 3: 이동
  switch (data.actionId) {
    case 0:
      return `<b>${data.todoTitle}</b>을(를) <b>${data.todoSrc}</b>에 <b>등록</b>하였습니다.`;
    case 1:
      return `<b>${data.todoTitle}</b>을(를) <b>${data.todoSrc}</b>에서 <b>삭제</b>하였습니다.`;
    case 2:
      return `<b>${data.todoTitle}</b>을(를) <b>수정</b>하였습니다.`;
    case 3:
      return `<b>${data.todoTitle}</b>을(를) <b>${data.todoSrc}</b>에서 <b>${data.todoDst}</b>으로 <b>이동</b>하였습니다.`;
  }
  return "";
}
