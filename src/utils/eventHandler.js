import Card from "../components/cards.js";
import {
  createCardInfoTemplate,
  createEditorTemplate,
} from "../components/templates.js";
import createModal from "../components/modal.js";
import { columnData } from "../../index.js";

const targetIdList = {
  add: addCard,
  inputTitle: checkRegisterStatus,
  inputContent: checkRegisterStatus,
  cancelBtn: cancelHandler,
  registerBtn: registerCard,
  saveBtn: saveHandler,
  deleteBtn: deleteHandler,
  editBtn: editCard,
};

export default function customEventHandler(event) {
  const target = event.target;
  const parentTarget = event.currentTarget;

  const handleTarget = targetIdList[target.id];
  if (handleTarget) {
    handleTarget({ target, parentTarget });
  }
}

// Column의 '+' 버튼 클릭시 카드 추가 함수
function addCard({ target }) {
  const column = target.closest(".column");
  const cardList = column.querySelector("#cardList");
  const isExistCard = column.querySelector(".newCard");
  if (!isExistCard) {
    const card = Card();
    cardList.insertAdjacentElement("afterbegin", card);
  } else {
    isExistCard.remove();
  }
  console.log(columnData.getCardData(column.id));
}

// 등록 함수 활성화 판단 함수
function checkRegisterStatus({ parentTarget }) {
  const title = parentTarget.querySelector(".title");
  const content = parentTarget.querySelector(".content");
  const register = parentTarget.querySelector(".register");
  let status = !(title.value.trim() && content.value.trim());

  register.disabled = status;
  register.style.opacity = status ? 0.3 : 1;
}

function cancelHandler({ target }) {
  const columnId = target.closest(".column").id;
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
