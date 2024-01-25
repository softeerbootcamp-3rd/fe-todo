export const todosReducer = (state, action) => {
  switch (action.type) {
    case "todos/INIT":
      return [...action.payload];
    default:
      return state;
  }
};
