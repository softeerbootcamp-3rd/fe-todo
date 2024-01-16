// import Card from "./cards";

export default function Column(title, id) {
  const column = document.createElement("div");
  column.className = "column";
  column.id = id;

  column.innerHTML = `
    <span>${title}</span>
    <span>count</span>
    <span>+</span>
    <span>X</span>`;
  return column;
}
