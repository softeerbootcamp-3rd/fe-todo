import { createColumnTemplate } from "../components/templates.js";
// import { columnList } from "../constants/columnData.js";
import customEventHandler from "../eventController/eventHandler.js";
import { createCard } from "./cards.js";

// Column 동적 생성 함수
export function createColumns(baseElement, getColumnData) {
    for (let column of getColumnData) {
        createSingleColumn(baseElement, column);
    }
}

// Column 생성 함수
function createSingleColumn(baseElement, columnList) {
    const newColumn = document.createElement("div");
    newColumn.className = "column";
    newColumn.id = columnList.id;
    newColumn.innerHTML = createColumnTemplate(columnList);

    eventRegister(newColumn);
    baseElement.appendChild(newColumn);

    const cardWrapper = newColumn.querySelector(".cardWrapper");
    createCard(cardWrapper, columnList);
}

function eventRegister(columnElement) {
    const eventTypes = ["click", "input"];
    eventTypes.forEach((eventType) => {
        columnElement.addEventListener(eventType, (e) => {
            customEventHandler(e);
        });
    });
}
