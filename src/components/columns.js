import Card from "./cards.js";

export default function Column({ title, id, count }) {
  const column = document.createElement("div");
  column.className = "column";
  column.id = id;

  column.innerHTML = `
    <span>${title}</span>
    <span>${count}</span>
    <span id="add">+</span>
    <span id="delete">X</span>`;
  return column;
}

function createCard(id) {
  const column = document.getElementById(id);

  const card = Card();
  column.appendChild(card);
}

function addCard() {
  const addId = document.getElementById("add");
  const columnId = addId.parentElement.id;
  addId.addEventListener("click", () => createCard(columnId));
}

document.addEventListener("DOMContentLoaded", addCard);
