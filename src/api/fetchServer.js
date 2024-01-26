import { deleteAllHistory, patchCard, postNewCard, postNewHistory, putColumn } from "./APIs";
import { deepCopy } from "../util/deepCopy";
import { store } from "../model/Store";

export const addCardToServer = async ({ columnId, cardData }) => {
  const newCard = await postNewCard(cardData);
  const newColumnData = deepCopy(store._columns[columnId]);
  newColumnData.value.unshift(cardData.cardId);
  const newColumn = await putColumn(newColumnData, columnId);

  return { newCard, newColumn };
};

export const deleteCardInServer = async (columnId, cardId) => {
  const newColumnData = deepCopy(store.columnData[columnId]);
  newColumnData.value = newColumnData.value.filter((id) => id !== cardId);
  return await putColumn(newColumnData, columnId);
};

export const moveCardInServer = async ({ columnId, newColumnValue }) => {
  const newColumnData = deepCopy(store.columnData[columnId]);
  newColumnData.value = newColumnValue;
  return await putColumn(newColumnData, columnId);
};

export const editCardInServer = async (cardId, cardData) => {
  const id = store._cards[cardId].id;
  return await patchCard(id, cardData);
};

export const addHistoryToServer = async (newHistory) => {
  return await postNewHistory(newHistory);
};
export const deleteHistoryInServer = async () => {
  const historyIdList = store._history.map((history) => history.id);
  return await deleteAllHistory(historyIdList);
};
