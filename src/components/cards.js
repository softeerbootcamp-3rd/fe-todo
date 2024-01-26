import { createEditorTemplate, createCardInfoTemplate } from "./templates.js ";
import { createLogContent } from "../components/log.js";
import store from "../Store/store.js";

// Card element
export function Card() {
    const card = document.createElement("div");
    card.className = "newCard";

    card.innerHTML = createEditorTemplate();
    return card;
}

export function createCard({ element, cardList }) {
    cardList.forEach((cardInfo) => {
        const registerCard = registeredCard(cardInfo);
        element.appendChild(registerCard);
    });
}

function registeredCard({ title, content }) {
    const card = document.createElement("div");
    card.className = "registeredCard";

    card.innerHTML = createCardInfoTemplate(title, content);
    return card;
}

export function addNewCard({ target }) {
    const column = target.closest(".column");
    const wrapper = column.querySelector(".cardWrapper");

    const isExistCard = wrapper.querySelector(".newCard");
    if (!isExistCard) {
        const card = Card();
        wrapper.insertAdjacentElement("afterbegin", card);
        return;
    }
    isExistCard.remove();
}

export function registerCard({ parentTarget }) {
    const ADD = "에 등록";
    const columnTitle = parentTarget.querySelector(".columnTitle").textContent;
    const title = parentTarget.querySelector(".title");
    const content = parentTarget.querySelector(".content");

    const originalTitle = title.value;
    const originalContent = content.value;

    //새로운 카드 추가를 위해 필요한 데이터
    const columnId = {
        todo: 0,
        doing: 1,
        complete: 2,
    };
    const columnIdx = columnId[parentTarget.id];
    const payload = {
        columnIndex: columnIdx,
        title: originalTitle,
        content: originalContent,
    };
    store.registeredCard(payload);

    createLogContent(
        `${originalTitle}을(를)`,
        `${columnTitle}${ADD}`,
        Date.now()
    );
}

function renderView({ columnId, newCardList, columnCnt }) {
    console.log("re-rendering!");
    const renderColumn = document.getElementById(columnId);
    const renderWrapper = renderColumn.querySelector(".cardWrapper");
    const renderColumnCount = renderColumn.querySelector(".countBox");
    renderWrapper.innerHTML = "";
    renderColumnCount.innerHTML = columnCnt;

    newCardList.forEach((cardInfo) => {
        const registerCard = registeredCard(cardInfo);
        renderWrapper.appendChild(registerCard);
    });
}

store.subscribe(renderView);
