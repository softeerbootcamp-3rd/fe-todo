export default class Store {
  #columnData = {};

  constructor() {}

  addCardData(key, cardData) {
    if (!this.#columnData[key]) {
      this.#columnData[key] = [];
    }
    this.#columnData[key].push(cardData);
  }

  removeCardData(key, cardData) {
    if (this.#columnData[key]) {
      this.#columnData[key] = this.#columnData[key].filter(
        (obj) => obj !== cardData
      );
    }
  }

  getCardData(columnId) {
    return this.#columnData[columnId];
  }
}
