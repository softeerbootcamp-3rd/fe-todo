import { getInitialData, postNewCard, postNewHistory, putColumn } from "../api/APIs";
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

  deleteCard({ columnId, cardId }) {
    const column = this._columns[columnId];
    column.value = column.value.filter((id) => id !== cardId);
  }

  editCard({ cardData: newCardData, cardId }) {
    let oldCardData = this._cards[cardId];
    this._cards[cardId] = { ...oldCardData, ...newCardData };
  }

  moveCard({ columnId, newColumnValue }) {
    this._columns[columnId].value = newColumnValue;
  }

  async addHistoryToServer(newHistory) {
    return await postNewHistory(newHistory);
  }

  addHistory(historyData) {
    this._history.unshift(historyData);
  }
}

export const store = new Store();
