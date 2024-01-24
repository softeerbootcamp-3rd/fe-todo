class Store {
  constructor() {
    this.cardId = 0;
    this._columns = {};
    this._cards = {};
    this._history = [];
  }

  async initDataFromServer() {
    const BASE_URL = "http://localhost:3000";
    try {
      const columnDataResponse = await fetch(`${BASE_URL}/columns`);
      const cardDataResponse = await fetch(`${BASE_URL}/cards`);
      const historyDataResponse = await fetch(`${BASE_URL}/history`);

      if (!columnDataResponse.ok || !cardDataResponse.ok || !historyDataResponse.ok) {
        throw new Error("Failed to fetch data from the server.");
      }

      const columnData = await columnDataResponse.json();
      const cardData = await cardDataResponse.json();
      const historyData = await historyDataResponse.json();

      this._columns = columnData;
      this._cards = cardData;
      this._history = historyData;
    } catch (error) {
      console.error("Error fetching data from the server:", error);
    }
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

  getColumn(columnId) {
    return this._columns[columnId];
  }

  getCard(cardId) {
    return this._cards[cardId];
  }

  addCard({ columnId, cardData }) {
    const column = this._columns[columnId];
    if (column) {
      column.value.unshift(this.cardId);
      this._cards[this.cardId] = cardData;
    } else {
      console.error(`Column with ID ${columnId} does not exist.`);
    }
  }

  deleteCard({ columnId, cardId }) {
    const column = this._columns[columnId];
    if (column) {
      column.value = column.value.filter((id) => id !== cardId);
    } else {
      console.error(`Column with ID ${columnId} does not exist.`);
    }
  }

  editCard({ cardData: newCardData, cardId }) {
    if (cardId) {
      let oldCardData = this._cards[cardId];
      this._cards[cardId] = { ...oldCardData, ...newCardData };
    } else {
      console.error(`Column with ID ${cardId} does not exist.`);
    }
  }

  moveCard({ columnId, newColumnValue }) {
    if (columnId && newColumnValue) {
      this._columns[columnId].value = newColumnValue;
    } else {
      console.error(`Column with ID ${sourceColumnId} or ${destinationColumnId} does not exist.`);
    }
  }

  getHistoryTemplate() {
    return {
      username: "",
      time: "",
      cardTitle: "",
      type: "",
      from: "",
      to: "",
    };
  }

  setDeleteCardHistory(cardId) {
    const { author: username, title: cardTitle } = this._cards[cardId];
    const newHistory = {
      ...this.getHistoryTemplate(),
      username,
      time: Date.now(),
      cardTitle,
      type: "삭제",
    };
    this._history.unshift(newHistory);
  }

  setAddCardHistory(columnId) {
    const { author: username, createdAt: time, title: cardTitle } = this._cards[this.cardId++];
    const columnTitle = this._columns[columnId].title;
    const newHistory = {
      ...this.getHistoryTemplate(),
      username,
      time,
      cardTitle,
      type: "등록",
      from: columnTitle,
    };
    this._history.unshift(newHistory);
  }

  setEditCardHistory(cardId) {
    const { author: username, updatedAt: time, title: cardTitle } = this._cards[cardId];
    const newHistory = {
      ...this.getHistoryTemplate(),
      username,
      time,
      cardTitle,
      type: "변경",
    };
    this._history.unshift(newHistory);
  }

  setMoveCardHistory({ cardId, startColumnId, endColumnId }) {
    const { author: username, title: cardTitle } = this._cards[cardId];
    const { title: from } = this._columns[startColumnId];
    const { title: to } = this._columns[endColumnId];
    const newHistory = {
      ...this.getHistoryTemplate(),
      username,
      cardTitle,
      time: new Date(),
      from,
      to,
      type: "이동",
    };

    this._history.unshift(newHistory);
  }
}

export const store = new Store();
