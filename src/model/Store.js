import {
  deleteAllHistory,
  getInitialData,
  patchCard,
  postNewCard,
  postNewHistory,
  putColumn,
} from "../api/APIs";
import { deepCopy } from "../util/deepCopy";
import { getCardsObject, getColumnsObject } from "../util/syncData";

// class Column {
//   constructor() {
//     this._columns = {};
//   }
//   addCardToColumn(columnId, cardId) {
//     const column = this._columns[columnId];
//     column.value.unshift(cardId);
//   }
// }

// class Card {
//   constructor() {
//     this._cards = {};
//   }

//   addCardData(cardData, cardId) {
//     this._cards[cardId] = cardData;
//   }
// }

// class History {
//   constructor() {
//     this._history = {};
//   }
//   addHistory(newHistory) {
//     this._history.unshift(newHistory);
//   }
// }

// class Storessss {
//   constructor() {
//     this._cardId = 3;
//     this.cardManager = new Card();
//     this.columnManager = new Column();
//     this.historyManager = new History();
//   }
//   addCard({ columnId, cardData }) {
//     this.cardManager.addCardData(cardData, this._cardId);
//     this.columnManager.addCardToColumn(columnId, this._cardId);
//     this._cardId++;
//   }
// }

class Store {
  constructor() {
    this._cardId = 0;
    this._columns = {};
    this._cards = {};
    this._history = [];
  }

  get columnData() {
    return this._columns;
  }

  get cardData() {
    return this._cards;
  }

  get historyData() {
    return this._history;
  }

  get cardId() {
    return this._cardId;
  }

  async initDataFromServer() {
    const [columnData, cardData, historyData] = await getInitialData();
    this._columns = getColumnsObject(columnData);
    this._cards = getCardsObject(cardData);
    this._history = historyData.reverse();
    this._cardId = Object.keys(this._cards).length;
  }

  async addCardToServer({ columnId, cardData }) {
    const newCard = await postNewCard(cardData);

    const newColumnData = deepCopy(this._columns[columnId]);
    newColumnData.value.unshift(cardData.cardId);
    const newColumn = await putColumn(newColumnData, columnId);

    return { newCard, newColumn };
  }

  addCard({ column, card }) {
    this._columns[column.id] = column;
    this._cards[card.cardId] = card;
  }

  async deleteCardInServer(columnId, cardId) {
    const newColumnData = deepCopy(this._columns[columnId]);
    newColumnData.value = newColumnData.value.filter((id) => id !== cardId);
    return await putColumn(newColumnData, columnId);
  }

  deleteCard(column) {
    this._columns[column.id] = column;
  }

  async editCardInServer(cardId, cardData) {
    const id = this._cards[cardId].id;
    return await patchCard(id, cardData);
  }

  editCard(newCard) {
    let oldCardData = this._cards[newCard.cardId];
    this._cards[newCard.cardId] = { ...oldCardData, ...newCard };
  }

  async moveCardInServer({ columnId, newColumnValue }) {
    const newColumnData = deepCopy(this._columns[columnId]);
    newColumnData.value = newColumnValue;
    return await putColumn(newColumnData, columnId);
  }

  moveCard(movedColumn) {
    this._columns[movedColumn.id] = movedColumn;
  }

  async addHistoryToServer(newHistory) {
    return await postNewHistory(newHistory);
  }

  addHistory(historyData) {
    this._history.unshift(historyData);
  }

  async deleteHistoryInServer() {
    const historyIdList = this._history.map((history) => history.id);
    return await deleteAllHistory(historyIdList);
  }
  deleteHistory(deletedList) {
    this._history = [];
  }
}

export const store = new Store();
