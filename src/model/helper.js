import { store } from "./store";

export const columnIdToCardList = (columnId) => {
    const cardIdList = store.getCardIdList(columnId);
    return cardIdList.map((cardId) => [cardId, store.getCard(cardId)]);
}

export const columnIdToIdx = (columnId) => {
    const regex = /[^0-9]/g;
    const result = columnId.replace(regex, "");
    return Number(result);
}