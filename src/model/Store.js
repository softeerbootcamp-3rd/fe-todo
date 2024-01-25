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

// store 클래스가 너무 거대해서 멤버변수를 이용해서 쪼개려는 시도를 하고 있습니다. 이렇게 하는 거 맞나요????
class Storessss {
  constructor() {
    this.cardId = 3;
    this.cardManager = new Card();
    this.columnManager = new Column();
  }
  addCard({ columnId, cardData }) {
    this.cardManager.addCardData(cardData, this.cardId);
    this.columnManager.addCardToColumn(columnId, this.cardId);
    this.cardId++;
  }
}

class Store {
  constructor() {
    this.cardId = 0;
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

  async initDataFromServer() {
    const BASE_URL = "http://localhost:3000";
    const fetchData = async (url, name) => {
      const response = await fetch(`${BASE_URL}${url}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${name} data from the server.`);
      }

      return response.json();
    };

    try {
      const dataUrls = ["/columns", "/cards", "/history"];
      const [columnData, cardData, historyData] = await Promise.all(
        dataUrls.map((url, index) => fetchData(url, ["column", "card", "history"][index]))
      );

      const columnsObject = columnData.reduce((acc, column, index) => {
        acc[`column${index}`] = column;
        return acc;
      }, {});

      const cardsObject = cardData.reduce((acc, card, index) => {
        acc[index] = card;
        return acc;
      }, {});

      this._columns = columnsObject;
      this._cards = cardsObject;
      this._histories = historyData;
      this.cardId = Object.keys(this._cards).length;
    } catch (error) {
      console.error("Error fetching data from the server:", error.message);
    }
  }

  //이 비동기 처리하는 부분이 너무 거대해서 어렵네요... 이렇게 메서드로 만드는게 맞는지 모르겠어요
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
