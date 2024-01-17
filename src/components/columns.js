import Card from "./cards.js";
import { handleRegisterStatus } from "./cards.js";
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

function handleAddClick() {
  const buttons = document.querySelectorAll(".add");

  buttons.forEach((button) => {
    button.addEventListener("click", () => addCard(button));
  });
}

function addCard(button) {
  // 공통 이벤트 동작
  const headerId = button.parentElement;
  const columnId = headerId.parentElement.id;
  createCard(columnId);
  handleRegisterStatus();
}

function createCard(id) {
  const column = document.getElementById(id);

  const card = Card();
  column.appendChild(card);
}

document.addEventListener("DOMContentLoaded", handleAddClick);
