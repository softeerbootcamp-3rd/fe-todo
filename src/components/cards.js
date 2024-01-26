import { createEditorTemplate, createCardInfoTemplate } from "./templates.js ";
import createModal from "./modal.js";
import todoStore, {
  CANCEL_CARD,
  EDIT_CARD,
  REGISTER_CARD,
  SAVE_CARD,
} from "./todoStore.js";
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
  const columnId = parentTarget.id;
  const title = card.querySelector(".title").value;
  const content = card.querySelector(".content").value;
  const action = {
    type: REGISTER_CARD,
    payload: {
      id: card.id,
      columnId: columnId,
      title: title,
      content: content,
      status: "registered",
    },
  };
  todoStore.dispatch(action);
}

function saveHandler({ target, parentTarget }) {
  const card = target.closest(".newCard");
  const newTitle = card.querySelector(".title").value;
  const newContent = card.querySelector(".content").value;

  const action = {
    type: SAVE_CARD,
    payload: {
      id: card.id,
      columnId: parentTarget.id,
      title: newTitle,
      content: newContent,
      status: "registered",
    },
  };
  todoStore.dispatch(action);
}

function deleteHandler({ target, parentTarget }) {
  const registeredCard = target.closest(".registeredCard");
  createModal(parentTarget, registeredCard);
}

function editCard({ parentTarget, target }) {
  const card = target.closest(".registeredCard");
  const title = card.querySelector(".registeredTitle").textContent;
  const content = card.querySelector(".registeredContent").textContent;

  const action = {
    type: EDIT_CARD,
    payload: { id: card.id, columnId: parentTarget.id },
  };
  todoStore.dispatch(action);
}

export { cancelHandler, registerCard, saveHandler, deleteHandler, editCard };
