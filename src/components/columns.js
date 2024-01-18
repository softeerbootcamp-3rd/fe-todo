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
  const header = button.parentElement;
  const column = header.parentElement;
  const columnId = column.id;

  const checkCard = createCard(columnId);
  if (checkCard) {
    handleRegisterStatus(column);
  }
}

function createCard(id) {
  const column = document.getElementById(id);
  const isExistCard = column.querySelector(".newCard");

  return checkValid(isExistCard, column);
}

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
