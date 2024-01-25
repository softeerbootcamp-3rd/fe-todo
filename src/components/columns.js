import { createColumnTemplate } from "./templates.js";
import Card from "../components/cards.js";

// Column element
export default function Column({ title, id, count }) {
  const column = document.createElement("div");
  column.className = "column";
  column.id = id;

  column.innerHTML = createColumnTemplate(title, id, count);

  return column;
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
