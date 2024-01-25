import { getInitialData } from "../api/fetcher";
import { getCardsObject, getColumnsObject } from "../util/syncData";

const BASE_URL = "http://localhost:3000";

class Column {
  constructor() {
    this._columns = {};
  }
  addCardToColumn(columnId, cardId) {
    const column = this._columns[columnId];
    if (column) {
      column.value.unshift(cardId);
    } else {
      console.error(`Column with ID ${columnId} does not exist.`);
    }
  }
}

class Card {
  constructor() {
    this._cards = {};
  }

  addCardData(cardData, cardId) {
    this._cards[cardId] = cardData;
  }
}

class History {
  constructor() {
    this._history = {};
  }
  addHistory(newHistory) {
    this._history.unshift(newHistory);
  }
}

class Storessss {
  constructor() {
    this._cardId = 3;
    this.cardManager = new Card();
    this.columnManager = new Column();
    this.historyManager = new History();
  }
  addCard({ columnId, cardData }) {
    this.cardManager.addCardData(cardData, this._cardId);
    this.columnManager.addCardToColumn(columnId, this._cardId);
    this._cardId++;
  }
}

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
    this._histories = historyData;
    this._cardId = Object.keys(this._cards).length;
  }

  async addCardToServer({ columnId, cardData }) {
    try {
      // 서버에 POST 요청을 보내어 새로운 카드 추가
      const cardResponse = await fetch(`${BASE_URL}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData),
      });

      const copy = { ...this._columns[columnId] };
      copy.value.unshift(cardData.cardId);

      const columnResponse = await fetch(`${BASE_URL}/columns/${columnId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(copy),
      });

      if (!cardResponse.ok) {
        throw new Error("Failed to add card to the server.");
      }

      // 서버에서 새로 추가된 카드의 정보를 받아옴
      const newCard = await cardResponse.json();
      const newColumn = await columnResponse.json();
      console.log(newCard, newColumn);
      this.addCard({ columnId, cardData: newCard });

      return newCard.id;
    } catch (error) {
      console.error("Error adding card to the server:", error);
      throw error; // 오류를 다시 던져서 호출자에게 알림
    }
  }

  addCard({ columnId, cardData }) {
    const column = this._columns[columnId];
    column.value.unshift(this._cardId);
    this._cards[this._cardId] = cardData;
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

  addHistory(newHistory) {
    this._history.unshift(newHistory);
  }
}

export const store = new Store();
