import { calculatorTime } from "../utils/history.js";
import { createLogBoxTemplate, logContent } from "./templates.js";

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

export const createLogContent = (title, action, time) => {
    const afterTime = calculatorTime(time);
    //제목, 유저 엑션(추가, 삭제, 수정), 생성시간, 파라미터로 받아오기
    const logInfo = {
        title: title,
        action: action,
        time: afterTime,
    };
    const newLog = logContent(logInfo);
    document.querySelector(".wrapper").insertAdjacentHTML("afterbegin", newLog);
};
