import Card from "../components/cards.js";
import {
    createCardInfoTemplate,
    createEditorTemplate,
} from "../components/templates.js";
import createModal from "../components/modal.js";

const eventHandlers = {
    add: addCard,
    inputTitle: checkRegisterStatus,
    inputContent: checkRegisterStatus,
    registerBtn: registerCard,
    cancelBtn: (target) => cancelHandler(target.closest(".newCard")),
    saveBtn: (target) => saveHandler(target.closest(".newCard")),
    deleteBtn: (parentTarget, target) => createModal(parentTarget, target),
    editBtn: (target) => editCard(target.closest(".registeredCard")),
};

export default function customEventHandler(event) {
    const target = event.target;
    const parentTarget = event.currentTarget;

    const handler = eventHandlers[target.id];

    if (handler) {
        if (["add", "cancelBtn", "saveBtn", "editBtn"].includes(target.id)) {
            handler(target);
            return;
        } else if (target.id === "deleteBtn") {
            handler(parentTarget, target.closest(".registeredCard"));
            return;
        }
        handler(parentTarget);
    }
}

// Column의 '+' 버튼 클릭시 카드 추가 함수
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

// 제목, 내용의 입력 값 유무 판단 함수
function checkInputsFilled(title, content, register) {
    let status = !(title.value.trim() && content.value.trim());

    register.disabled = status;
    register.style.opacity = status ? 0.3 : 1;
}

// 등록 함수 활성화 판단 함수
function checkRegisterStatus(parentTarget) {
    const titleInput = parentTarget.querySelector(".title");
    const contentInput = parentTarget.querySelector(".content");
    const registerButton = parentTarget.querySelector(".register");

    checkInputsFilled(titleInput, contentInput, registerButton);
}

// Card 등록 함수
function registerCard(column) {
    const title = column.querySelector(".title");
    const content = column.querySelector(".content");
    const countBox = column.querySelector(".countBox");
    const card = column.querySelector(".newCard");

    const newCount = parseInt(countBox.textContent) + 1;
    countBox.innerHTML = newCount;

    card.className = "registeredCard";

    const originalTitle = title.value;
    const originalContent = content.value;

    card.innerHTML = createCardInfoTemplate(originalTitle, originalContent);
}

function editCard(card) {
    const title = card.querySelector(".registeredTitle").textContent;
    const content = card.querySelector(".registeredContent").textContent;
    localStorage.setItem("originalTitle", title);
    localStorage.setItem("originalContent", content);

    card.className = "newCard";
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
