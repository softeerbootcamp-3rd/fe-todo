import { createColumnTemplate } from "../components/templates.js";
import { columns } from "../constants/columnData.js";
import customEventHandler from "../utils/eventHandler.js";

// Column 동적 생성 함수
export function mainColumns(baseElement) {
    for (let column of columns) {
        createColumn(baseElement, column);
    }
}

// Column 생성 함수
function createColumn(baseElement, columns) {
    const newColumn = document.createElement("div");
    newColumn.className = "column";
    newColumn.id = columns.id;
    newColumn.innerHTML = createColumnTemplate(columns);

    eventRegister(newColumn);
    baseElement.appendChild(newColumn);
}

function eventRegister(columnElement) {
    const eventTypes = ["click", "input"];
    for (let eventType of eventTypes) {
        columnElement.addEventListener(eventType, (e) => {
            customEventHandler(e);
        });
    }
}
