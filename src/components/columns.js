// import Card from "./cards";

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
