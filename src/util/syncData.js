export const getColumnsObject = (columnData) =>
  columnData.reduce((acc, column, index) => {
    acc[`column${index}`] = column;
    return acc;
  }, {});

export const getCardsObject = (cardData) =>
  cardData.reduce((acc, card) => {
    acc[card.cardId] = card;
    return acc;
  }, {});
