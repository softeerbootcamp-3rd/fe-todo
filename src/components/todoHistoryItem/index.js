import styles from "./todoHistoryItem.module.scss";
import userImage from "../../asset/img/userImage.png";

const DAY = 86400000;
const HOUR = 3600000;
const MINUTE = 60000;

export default function todoHistoryItem(renderTarget, initialData) {
  render(renderTarget, initialData);
}

function render(renderTarget, initialData) {
  renderTarget.innerHTML = /*html*/ `
    <div class="${styles.todoHistoryItem}">
      <img class="${styles.todoHistoryItem__userImage}" src="${userImage}"/>
      <div class="${styles.todoHistoryItem__contentContainer}">
        <p class="${styles.todoHistoryItem__author}">@${
    initialData.authorName
  }</p>
        <p class="${styles.todoHistoryItem__content}">${formatHistoryText(
    initialData
  )}</p>
        <p class="${styles.todoHistoryItem__timeStamp}">${generateTimeString(
    initialData.timeStamp
  )}</p>
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

export function generateTimeString(millis) {
  const diff = new Date().getTime() - millis;
  if (diff >= DAY) return `${Math.floor(diff / DAY)}일 전`;
  if (diff >= HOUR) return `${Math.floor(diff / HOUR)}시간 전`;
  if (diff >= MINUTE) return `${Math.floor(diff / MINUTE)}분 전`;
  return `방금 전`;
}
