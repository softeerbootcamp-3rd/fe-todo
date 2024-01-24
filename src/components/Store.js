import { createCardInfoTemplate } from "./templates";

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
    this.#columnData[columnId].unshift(cardData);
    return this.cardId++;
  }

  removeCardData(columnId, cardId) {
    if (this.#columnData[columnId]) {
      this.#columnData[columnId] = this.#columnData[columnId].filter(
        (card) => card.id !== +cardId
      );
    }
  }

  editCardData(columnId, cardId, newTitle, newContent) {
    if (this.#columnData[columnId]) {
      const index = this.#columnData[columnId].findIndex(
        (card) => card.id === +cardId
      );

      if (index !== -1) {
        this.#columnData[columnId][index].title = newTitle;
        this.#columnData[columnId][index].content = newContent;
      }
    }
  }

  getCardData(columnId) {
    return this.#columnData[columnId];
  }

  render(columnId) {
    const cardList = document.getElementById(`cardList-${columnId}`);
    this.#columnData[columnId].forEach((card) => {
      const cardContent = document.createElement("div");
      cardContent.className = "registeredCard";
      cardContent.id = card.id;
      cardContent.innerHTML = createCardInfoTemplate(card.title, card.content);
      cardList.appendChild(cardContent);
    });
  }
}
