import { columnDataTable } from "../../../model/model.js";
import { renderListCount, renderListTitle } from "../../render.js";

export const editColumnHandler = ({target}) => {
    const columnId = target.closest(".main__column").id;
    const { title } = columnDataTable[columnId];
    const columnNavInfo = target.closest(".column__nav__info");
    columnNavInfo.innerHTML = `
    <input type="text" class="js-column-name__input column__nav__info__title__input" id='${columnId}-input' value="${title}">
    `; 
    columnNavInfo.children[0].focus();
}

export const focusOutHandler = ({target}) => {
    if(target.classList[0] !== 'js-column-name__input') return;
    const newTitle = target.value;
    const columnId = target.id.split("-")[0];
    if(target.value.length !== 0 && target.value.length <= 50) 
    { 
        columnDataTable[columnId].title = newTitle;
    }
    target.remove();
    renderListTitle(document.getElementById(columnId));
    renderListCount(document.getElementById(columnId));
}