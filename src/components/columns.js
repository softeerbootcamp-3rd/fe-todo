import { createColumnTemplate } from "./templates.js";

// Column element
export default function Column({ title, id, count }) {
  const column = document.createElement("div");
  column.className = "column";
  column.id = id;

  column.innerHTML = createColumnTemplate(title, id, count);

  return column;
}
