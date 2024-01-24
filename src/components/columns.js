import { createColumnTemplate } from "../components/templates.js";
// import { columnList } from "../constants/columnData.js";
import customEventHandler from "../eventController/eventHandler.js";
import { getData } from "../services/http.js";
import { createCard } from "./cards.js";

// Column 동적 생성 함수
export async function mainColumns(baseElement) {
    const data = await getData();
    for (let column of data) {
        createColumn(baseElement, column);
    }
}

// Column 생성 함수
function createColumn(baseElement, columnList) {
    const newColumn = document.createElement("div");
    newColumn.className = "column";
    newColumn.id = columnList.id;
    newColumn.innerHTML = createColumnTemplate(columnList);

    eventRegister(newColumn);
    baseElement.appendChild(newColumn);
    createCard(newColumn, columnList);
}

function eventRegister(columnElement) {
    const eventTypes = ["click", "input"];
    for (let eventType of eventTypes) {
        columnElement.addEventListener(eventType, (e) => {
            customEventHandler(e);
        });
    }
}
