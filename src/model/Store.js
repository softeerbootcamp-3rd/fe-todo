class Store {
  constructor() {
    // 초기 cardId를 0으로 설정
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
    const column = this.getColumn(columnId);
    if (column) {
      column.value.unshift(this.cardId);
      this._cards[this.cardId] = cardData;
    } else {
      console.error(`Column with ID ${columnId} does not exist.`);
    }
  }

  deleteCard({ columnId, cardId }) {
    const column = this.getColumn(columnId);
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

  moveCard({ sourceColumnId, destinationColumnId, cardId }) {
    const sourceColumn = this.getColumn(sourceColumnId);
    const destinationColumn = this.getColumn(destinationColumnId);

    if (sourceColumn && destinationColumn) {
      this.deleteCard({ columnId: sourceColumnId, cardId });
      this.addCard({ columnId: destinationColumnId, cardId });
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
    const { author: username, title: cardTitle } = this.getCard(cardId);
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
    const { author: username, createdAt: time, title: cardTitle } = this.getCard(this.cardId++);
    const columnTitle = this.getColumn(columnId).title;
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
    const { author: username, updatedAt: time, title: cardTitle } = this.getCard(cardId);
    const newHistory = {
      ...this.getHistoryTemplate(),
      username,
      time,
      cardTitle,
      type: "변경",
    };
    this._history.unshift(newHistory);
  }
}

export const store = new Store();
