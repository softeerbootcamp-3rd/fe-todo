import Card, { handleRegisterStatus } from "./cards.js";
import { createColumnTemplate } from "./templates.js";

// Column element
export default function Column({ title, id, count }) {
  const column = document.createElement("div");
  column.className = "column";
  column.id = id;

  column.innerHTML = createColumnTemplate(title, id, count);

  // '+' 버튼 클릭시 이벤트 처리
  const addButton = column.querySelector(".add");
  addButton.addEventListener("click", () => addCard(column));

  return column;
}

// '+' 버튼 클릭시 콜백함수
function addCard(column) {
  const isExistCard = column.querySelector(".newCard");
  if (!isExistCard) {
    const card = Card();
    column.appendChild(card);
    handleRegisterStatus(column);
  } else {
    isExistCard.remove();
  }
}
