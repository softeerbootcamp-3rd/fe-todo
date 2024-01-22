import { cardDataTable, columnDataTable } from "./model";

export const columnIdToCardList = (columnId) => {
    const cardIdList = columnDataTable[columnId].value;
    return cardIdList.map((cardId) => [cardId, cardDataTable[cardId]]);
}

export const columnIdToIdx = (columnId) => {
    const regex = /[^0-9]/g;
    const result = columnId.replace(regex, "");
    return Number(result);
}