import styles from "./todoHistoryItem.module.scss";
import userImage from "../../asset/img/userImage.png";

export function todoHistoryItemTemplate(props) {
  return `
    <div class="${styles.todoHistoryItem}">
        <img class="${styles.todoHistoryItem__userImage}" src="${userImage}"></img>
        <div class="${styles.todoHistoryItem__contentContainer}">
            <p class="${styles.todoHistoryItem__author}">@${props.authorName}</p>
            <p class="${styles.todoHistoryItem__content}">${props.text}</p>
            <p class="${styles.todoHistoryItem__timeStamp}">${props.timeStampText}</p>
        </div>
    </div>
  `;
}
