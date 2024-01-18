import createModal from "./modal.js";
import { createEditorTemplate, createCardInfoTemplate } from "./templates.js ";

// Card element
export default function Card() {
  // 300 120
  const card = document.createElement("div");
  card.className = "newCard";

  card.innerHTML = createEditorTemplate();
  return card;
}

// Card 등록 내용 관련 이벤트 처리
export function handleRegisterStatus(column) {
  const cardElement = column.querySelector(".newCard");
  const titleInput = column.querySelector(".title");
  const contentInput = column.querySelector(".content");
  const cancelButton = column.querySelector(".cancel");
  const registerButton = column.querySelector(".register");

  registerButton.disabled = true;

  function handleInput() {
    checkInputs(titleInput, contentInput, registerButton);
  }

  titleInput.addEventListener("input", handleInput);
  contentInput.addEventListener("input", handleInput);
  registerButton.addEventListener("click", () =>
    register(column, cardElement, titleInput, contentInput)
  );
  cancelButton.addEventListener("click", () => cardElement.remove());
}
// title, content 내용 유무 판단, 등록 버튼 활성화
function checkInputs(title, content, register) {
  let status = !(title.value.trim() && content.value.trim());
  register.disabled = status;
  register.style.opacity = status ? 0.3 : 1;
}

// Card 등록 함수
function register(column, card, title, content) {
  const countBox = column.querySelector(".countBox");
  const newCount = Number(countBox.textContent) + 1;
  countBox.innerHTML = newCount;

  card.classList.remove("newCard");
  card.classList.add("registeredCard");

  const originalTitle = title.value;
  const originalContent = content.value;

  card.innerHTML = createCardInfoTemplate(originalTitle, originalContent);

  const editButton = card.querySelector("#edit");
  editButton.addEventListener("click", () =>
    editHandler(card, originalTitle, originalContent)
  );

  const deleteButton = card.querySelector("#delete");
  deleteButton.addEventListener("click", () => createModal(column, card));
}

// 등록 완료 Card 수정 처리 함수
function editHandler(card, title, content) {
  card.classList.remove("registeredCard");
  card.classList.add("newCard");
  card.innerHTML = createEditorTemplate(title, content, true);

  const cancelButton = card.querySelector(".cancel");
  const saveButton = card.querySelector(".save");

  cancelButton.addEventListener("click", () =>
    cancelHandler(card, title, content)
  );
  saveButton.addEventListener("click", () => saveHandler(card));
}

// 수정 기능 내의 취소 처리 함수
function cancelHandler(card, title, content) {
  card.classList.remove("newCard");
  card.classList.add("registeredCard");
  card.innerHTML = createCardInfoTemplate(title, content);

  // 이후의 동작 또는 이벤트 처리를 추가할 수 있습니다.
  console.log("cancel end");
  const editButton = card.querySelector("#edit");
  editButton.addEventListener("click", () => editHandler(card, title, content));

  return;
}

// 수정 기능 내의 저장 처리 함수
function saveHandler(card) {
  const newTitle = card.querySelector(".title").value;
  const newContent = card.querySelector(".content").value;

  card.classList.remove("newCard");
  card.classList.add("registeredCard");

  card.innerHTML = createCardInfoTemplate(newTitle, newContent);
  // 이후의 동작 또는 이벤트 처리를 추가할 수 있습니다.
  console.log("save end");
  const editButton = card.querySelector("#edit");
  editButton.addEventListener("click", () =>
    editHandler(card, newTitle, newContent)
  );

  return;
}
