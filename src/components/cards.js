import { createEditorTemplate, createCardInfoTemplate } from "./templates.js ";
import createModal from "./modal.js";
import { columnData } from "../../index.js";

// Card element
export default function Card() {
  const card = document.createElement("div");
  card.className = "newCard";

  card.innerHTML = createEditorTemplate();
  return card;
}

function cancelHandler({ target }) {
  const card = target.closest(".newCard");
  const currentStatus = card.querySelector(".register").textContent;
  const status = currentStatus === "저장";

  if (status) {
    const title = localStorage.getItem(`originalTitle-${card.id}`);
    const content = localStorage.getItem(`originalContent-${card.id}`);
    card.className = "registeredCard";
    card.innerHTML = createCardInfoTemplate(title, content);
    return;
  }
  card.remove();
}

// Card 등록 함수
function registerCard({ target, parentTarget }) {
  const card = target.closest(".newCard");
  const title = card.querySelector(".title").value;
  const content = card.querySelector(".content").value;
  const countBox = parentTarget.querySelector(".countBox");

  const newCount = Number(countBox.textContent) + 1;
  countBox.innerHTML = newCount;

  card.className = "registeredCard";

  const cardId = columnData.addCardData(parentTarget.id, {
    title,
    content,
  });
  card.id = cardId;
  card.innerHTML = createCardInfoTemplate(title, content);
  return card;
}

function saveHandler({ target, parentTarget }) {
  const card = target.closest(".newCard");
  const newTitle = card.querySelector(".title").value;
  const newContent = card.querySelector(".content").value;
  card.className = "registeredCard";

  card.innerHTML = createCardInfoTemplate(newTitle, newContent);
  columnData.editCardData(parentTarget.id, card.id, newTitle, newContent);
}

function deleteHandler({ target, parentTarget }) {
  const registeredCard = target.closest(".registeredCard");
  createModal(parentTarget, registeredCard);
}

function editCard({ target }) {
  const card = target.closest(".registeredCard");
  const title = card.querySelector(".registeredTitle").textContent;
  const content = card.querySelector(".registeredContent").textContent;

  localStorage.setItem(`originalTitle-${card.id}`, title);
  localStorage.setItem(`originalContent-${card.id}`, content);

  card.className = "newCard";
  card.innerHTML = createEditorTemplate(title, content, true);
}

export { cancelHandler, registerCard, saveHandler, deleteHandler, editCard };
