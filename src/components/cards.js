import { createEditorTemplate, createCardInfoTemplate } from "./templates.js ";
import createModal from "./modal.js";
import todoStore, { CANCEL_CARD } from "./todoStore.js";
// import { columnData } from "../../index.js";

// Card element
export default function Card() {
  // 문자열로부터 DOMParser 객체 생성
  const parser = new DOMParser();

  // 문자열을 HTML 문서로 파싱
  const htmlString = createEditorTemplate();
  const doc = parser.parseFromString(htmlString, "text/html");
  // 파싱된 문서에서 원하는 요소 얻기
  const newElement = doc.body.firstChild;

  return newElement;
}

function cancelHandler({ target, parentTarget }) {
  console.log(target, parentTarget);
  const cardId = target.closest(".newCard").id;
  const columnId = parentTarget.id;
  const action = {
    type: CANCEL_CARD,
    payload: { id: cardId, columnId: columnId },
  };
  todoStore.dispatch(action);
}

// Card 등록 함수
function registerCard({ target, parentTarget }) {
  const card = target.closest(".newCard");
  const title = card.querySelector(".title").value;
  const content = card.querySelector(".content").value;
  const countBox = parentTarget.querySelector(".countBox");

  const newCount = Number(countBox.textContent) + 1;
  countBox.innerHTML = newCount;

  const cardList = document.getElementById(`cardList-${parentTarget.id}`);
  cardList.innerHTML = "";
  columnData.addCardData(parentTarget.id, {
    title,
    content,
  });
  return card;
}

function saveHandler({ target, parentTarget }) {
  const card = target.closest(".newCard");
  const newTitle = card.querySelector(".title").value;
  const newContent = card.querySelector(".content").value;

  const cardList = document.getElementById(`cardList-${parentTarget.id}`);
  cardList.innerHTML = "";
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
