import { createLogBoxTemplate } from "./templates.js";

const NONE = "none";
const FLEX = "flex";

export const createLogBox = (baseElement) => {
    const logIcon = document.getElementById("logIcon");
    const logElement = logBox();
    baseElement.appendChild(logElement);
    eventRegister(logIcon, logElement);
};

const logBox = () => {
    const logElement = document.createElement("div");
    logElement.className = "logBox";
    logElement.id = "box";
    logElement.innerHTML = createLogBoxTemplate();
    logElement.style.display = NONE;

    return logElement;
};

const eventRegister = (element, target) => {
    element.addEventListener("click", () => toggleElement(target));
};

const toggleElement = (target) => {
    target.style.display = target.style.display === NONE ? FLEX : NONE;
};
