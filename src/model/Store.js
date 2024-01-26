import { getInitialData } from "../api/APIs";
import { getCardsObject, getColumnsObject } from "../util/syncData";

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

  addCard({ column, card }) {
    this._columns[column.id] = column;
    this._cards[card.cardId] = card;
  }

  deleteCard(column) {
    this._columns[column.id] = column;
  }

  editCard(newCard) {
    let oldCardData = this._cards[newCard.cardId];
    this._cards[newCard.cardId] = { ...oldCardData, ...newCard };
  }

  moveCard(movedColumn) {
    this._columns[movedColumn.id] = movedColumn;
  }

  addHistory(historyData) {
    this._history.unshift(historyData);
  }

  deleteHistory() {
    this._history = [];
  }
}

export const store = new Store();
