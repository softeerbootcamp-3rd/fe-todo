export const getColumnsObject = (columnData) =>
  columnData.reduce((acc, column, index) => {
    acc[`column${index}`] = column;
    return acc;
  }, {});

export const getCardsObject = (cardData) =>
  cardData.reduce((acc, card, index) => {
    acc[index] = card;
    return acc;
  }, {});
