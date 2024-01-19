import Card from "../components/cards.js";
import {
  createCardInfoTemplate,
  createEditorTemplate,
} from "../components/templates.js";
import createModal from "../components/modal.js";

const targetList = [
  "add",
  "inputTitle",
  "inputContent",
  "cancelBtn",
  "registerBtn",
  "saveBtn",
  "deleteBtn",
  "editBtn",
];

export default function customEventHandler(event) {
  const target = event.target;
  const parentTarget = event.currentTarget;

  switch (target.id) {
    case targetList[0]: {
      addCard(target);
      break;
    }
    case targetList[1]: {
      console.log("input title event");

      checkRegisterStatus(parentTarget);
      break;
    }
    case targetList[2]: {
      console.log("input content event");

      checkRegisterStatus(parentTarget);
      break;
    }
    case targetList[3]: {
      console.log("cancel btn event");

      const cardElement = parentTarget.querySelector(".newCard");
      cancelHandler(cardElement);
      break;
    }
    case targetList[4]: {
      console.log("register btn event");

      register(parentTarget);
      break;
    }
    case targetList[5]: {
      console.log("save btn event");

      const registeredCard = target.closest(".newCard");
      saveHandler(registeredCard);
      break;
    }
    case targetList[6]: {
      console.log("delete btn event");

      const registeredCard = target.closest(".registeredCard");
      createModal(parentTarget, registeredCard);
      break;
    }
    case targetList[7]: {
      console.log("edit btn event");

      const registeredCard = target.closest(".registeredCard");
      editHandler(registeredCard);
      break;
    }
    default:
      break;
  }
}

// '+' 버튼 클릭시 카드 추가
function addCard(target) {
  const column = target.closest(".column");
  const isExistCard = column.querySelector(".newCard");
  if (!isExistCard) {
    const card = Card();
    column.appendChild(card);
    // handleRegisterStatus(column);
  } else {
    isExistCard.remove();
  }
}

function checkInputsFilled(title, content, register) {
  let status = !(title.value.trim() && content.value.trim());

  register.disabled = status;
  register.style.opacity = status ? 0.3 : 1;
}

function checkRegisterStatus(parentTarget) {
  const titleInput = parentTarget.querySelector(".title");
  const contentInput = parentTarget.querySelector(".content");
  const registerButton = parentTarget.querySelector(".register");

  checkInputsFilled(titleInput, contentInput, registerButton);
}

// Card 등록 함수
function register(column) {
  const title = column.querySelector(".title");
  const content = column.querySelector(".content");
  const countBox = column.querySelector(".countBox");
  const card = column.querySelector(".newCard");

  const newCount = Number(countBox.textContent) + 1;
  countBox.innerHTML = newCount;

  card.className = "registeredCard";

  const originalTitle = title.value;
  const originalContent = content.value;

  card.innerHTML = createCardInfoTemplate(originalTitle, originalContent);
}

function editHandler(card) {
  const title = card.querySelector(".registeredTitle").textContent;
  const content = card.querySelector(".registeredContent").textContent;
  localStorage.setItem("originalTitle", title);
  localStorage.setItem("originalContent", content);

  card.classList.remove("registeredCard");
  card.classList.add("newCard");
  card.innerHTML = createEditorTemplate(title, content, true);
}

function saveHandler(card) {
  const newTitle = card.querySelector(".title").value;
  const newContent = card.querySelector(".content").value;

  card.classList.remove("newCard");
  card.classList.add("registeredCard");

  card.innerHTML = createCardInfoTemplate(newTitle, newContent);
}

function cancelHandler(card) {
  const currentStatus = card.querySelector(".register").textContent;
  const status = currentStatus === "저장";

  if (status) {
    const title = localStorage.getItem("originalTitle");
    const content = localStorage.getItem("originalContent");
    card.classList.remove("newCard");
    card.classList.add("registeredCard");
    card.innerHTML = createCardInfoTemplate(title, content);
    return;
  }
  card.remove();
}
