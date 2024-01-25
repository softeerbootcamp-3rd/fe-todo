import { createColumnTemplate } from "./templates.js";
import Card from "../components/cards.js";
import { columns } from "../constants/columnData.js";
import customEventHandler from "../utils/eventHandler.js";

// Column element
export default function Column({ title, id, count }) {
  const column = document.createElement("div");
  column.className = "column";
  column.id = id;

  column.innerHTML = createColumnTemplate(title, id, count);

  return column;
}

// Column 생성 함수
function createColumn(column, id) {
  const listenerTypes = ["click", "input"];
  const targetId = document.getElementById(id);
  const columnElement = Column(column);

  for (let listenerType of listenerTypes) {
    columnElement.addEventListener(listenerType, (e) => {
      customEventHandler(e);
    });
  }

  targetId.appendChild(columnElement);
}

// Column 동적 생성 함수
export function generateColumns(id) {
  console.log(id);
  for (let column of columns) {
    createColumn(column, id);
  }
}

// Column의 '+' 버튼 클릭시 카드 추가 함수
export function addCard({ target }) {
  const column = target.closest(".column");
  const cardList = column.querySelector(`#cardList-${column.id}`);
  const isExistCard = column.querySelector(".newCard");
  if (!isExistCard) {
    const card = Card();
    cardList.insertAdjacentElement("afterbegin", card);
  } else {
    isExistCard.remove();
  }
}
