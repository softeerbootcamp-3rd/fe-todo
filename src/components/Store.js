export default class Store {
  #columnData = {};

  constructor() {
    this.cardId = 0;
  }

  addCardData(columnId, cardData) {
    if (!this.#columnData[columnId]) {
      this.#columnData[columnId] = [];
    }
    cardData["id"] = this.cardId;
    this.#columnData[columnId].push(cardData);
    return this.cardId++;
  }

  removeCardData(columnId, cardData) {
    if (this.#columnData[columnId]) {
      this.#columnData[columnId] = this.#columnData[columnId].filter(
        (obj) => obj !== cardData
      );
    }
  }

  getCardData(columnId) {
    return this.#columnData[columnId];
  }
}
