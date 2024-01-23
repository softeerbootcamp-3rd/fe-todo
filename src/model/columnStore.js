export const initColumn = {
  column0: { title: "해야할 일", value: ["0"] },
  column1: { title: "하고 있는 일", value: ["1"] },
  column2: { title: "완료한 일", value: ["2"] },
};

class ColumnStore extends Store {
  constructor(createState) {
    super(createState);
  }

  addCard(columnId, cardId) {
    super.setState((columnState) => {
      const newColumnState = { ...columnState };
      newColumnState[columnId].value.unshift(cardId);
      return newColumnState;
    });
  }
}

export const columnStore = new ColumnStore();
