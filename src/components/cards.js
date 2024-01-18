import { createEditorTemplate, createCardInfoTemplate } from "./templates.js ";

export default function Card() {
  // 300 120
  const card = document.createElement("div");
  card.className = "newCard";

  card.innerHTML = createEditorTemplate();
  return card;
}

export function handleRegisterStatus(column) {
  console.log(column);
  const cardElement = column.querySelector(".newCard");
  const titleInput = column.querySelector(".title");
  const contentInput = column.querySelector(".content");
  const cancelButton = column.querySelector(".cancel");
  const registerButton = column.querySelector(".register");

  registerButton.disabled = true;

  titleInput.addEventListener("input", () =>
    checkInputs(titleInput, contentInput, registerButton)
  );
  contentInput.addEventListener("input", () =>
    checkInputs(titleInput, contentInput, registerButton)
  );
  registerButton.addEventListener("click", () =>
    register(column, cardElement, titleInput, contentInput)
  );
  cancelButton.addEventListener("click", () => cardElement.remove());
}

function checkInputs(title, content, register) {
  let status = !(title.value.trim() && content.value.trim());
  register.disabled = status;
  register.style.opacity = status ? 0.3 : 1;
}

function register(column, card, title, content) {
  const countBox = column.querySelector(".countBox");
  const newCount = Number(countBox.textContent) + 1;
  countBox.innerHTML = newCount;

  card.classList.remove("newCard");
  card.classList.add("registeredCard");

  const originalTitle = title.value;
  const originalContent = content.value;

  card.innerHTML = createCardInfoTemplate(originalTitle, originalContent);

  console.log(card);

  const editButton = card.querySelector("#edit");
  editButton.addEventListener("click", () =>
    editHandler(card, originalTitle, originalContent)
  );
}

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
