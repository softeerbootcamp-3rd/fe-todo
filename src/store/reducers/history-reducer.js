// TODO: reducer must be a pure function
export const historyReducer = (state, action) => {
  switch (action.type) {
    case "history/INIT":
      return [...action.payload];
    default:
      return state;
  }
};
