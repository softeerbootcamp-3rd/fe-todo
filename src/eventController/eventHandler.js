import { addNewCard, registerCard } from "../components/cards.js";
import {
    createCardInfoTemplate,
    createEditorTemplate,
} from "../components/templates.js";
import createModal from "../components/modal.js";
import { createLogContent } from "../components/log.js";

const eventHandlers = {
    add: addNewCard,
    inputTitle: checkRegisterStatus,
    inputContent: checkRegisterStatus,
    registerBtn: registerCard,
    cancelBtn: cancelHandler,
    saveBtn: saveHandler,
    deleteBtn: createModalHandler,
    editBtn: editCard,
};

export default function customEventHandler(event) {
    const target = event.target;
    const parentTarget = event.currentTarget;

    const handler = eventHandlers[target.id];
    if (handler) {
        handler({ target, parentTarget });
    }
}

// 등록 함수 활성화 판단 함수
function checkRegisterStatus({ parentTarget }) {
    const TURNON = 1;
    const TURNOFF = 0.3;
    const titleInput = parentTarget.querySelector(".title");
    const contentInput = parentTarget.querySelector(".content");
    const registerButton = parentTarget.querySelector(".register");

    let status = !(titleInput.value.trim() && contentInput.value.trim());
    registerButton.disabled = status;
    registerButton.style.opacity = status ? TURNOFF : TURNON;
}

function editCard({ target }) {
    const card = target.closest(".registeredCard");
    const title = card.querySelector(".registeredTitle").textContent;
    const content = card.querySelector(".registeredContent").textContent;
    localStorage.setItem("originalTitle", title);
    localStorage.setItem("originalContent", content);

    card.className = "newCard";
    card.innerHTML = createEditorTemplate(title, content, true);
}

function saveHandler({ target }) {
    const EDIT = "로 수정";
    const card = target.closest(".newCard");
    const newTitle = card.querySelector(".title").value;
    const newContent = card.querySelector(".content").value;

    card.classList.remove("newCard");
    card.classList.add("registeredCard");

    card.innerHTML = createCardInfoTemplate(newTitle, newContent);
    createLogContent(newTitle, `${EDIT}`, Date.now());
}

function cancelHandler({ target }) {
    const card = target.closest(".newCard");
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

function createModalHandler({ target, parentTarget }) {
    const card = target.closest(".registeredCard");
    createModal(parentTarget, card);
}
