import Card from "./cards.js";

export default function Column({ title, id, count }) {
  const column = document.createElement("div");
  column.className = "column";
  column.id = id;

  column.innerHTML = `
  <div id = "columnHeader">
    <div class="columnInfo"> 
        <span>${title}</span>
        <span class="countBox">${count}</span>
    </div>
    <span id="add"><i class="fa-solid fa-plus"></i></span>
    <span id="delete"><i class="fa-solid fa-xmark"></i></span>
  </div>
    `;
  return column;
}

function createCard(id) {
  const column = document.getElementById(id);

  const card = Card();
  column.appendChild(card);
}

function addCard() {
  const addId = document.getElementById("add");
  const columnId = addId.parentElement;
  const header = columnId.parentElement.id;
  addId.addEventListener("click", () => createCard(header));
}

document.addEventListener("DOMContentLoaded", addCard);
