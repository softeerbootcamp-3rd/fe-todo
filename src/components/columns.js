import Card from "./cards.js";
import { handleRegisterStatus } from "./cards.js";

// Column element
export default function Column({ title, id, count }) {
  const column = document.createElement("div");
  column.className = "column";
  column.id = id;

  column.innerHTML = `
  <header id = "columnHeader">
    <div class="columnInfo"> 
        <span>${title}</span>
        <span class="countBox">${count}</span>
    </div>
    <span id="add" class="add" ><i class="fa-solid fa-plus"></i></span>
    <span id="delete"><i class="fa-solid fa-xmark"></i></span>
  </header>
    `;
  return column;
}

// columnHeader의 '+' 클릭시 이벤트 처리
function handleAddClick() {
  const buttons = document.querySelectorAll(".add");

  buttons.forEach((button) => {
    button.addEventListener("click", () => addCard(button));
  });
}

// '+' 버튼 클릭시 콜백함수
function addCard(button) {
  const header = button.parentElement;
  const column = header.parentElement;
  const columnId = column.id;

  const checkCard = createCard(columnId);
  if (checkCard) {
    handleRegisterStatus(column);
  }
}

// Column 내 Card 추가 함수
function createCard(id) {
  const column = document.getElementById(id);
  const isExistCard = column.querySelector(".newCard");

  return checkValid(isExistCard, column);
}

// 등록 전 Card 유무 판단 후 처리 함수
function checkValid(status, parent) {
  if (!status) {
    const card = Card();
    parent.appendChild(card);
    return true;
  }
  status.remove();
  return false;
}

document.addEventListener("DOMContentLoaded", handleAddClick);
