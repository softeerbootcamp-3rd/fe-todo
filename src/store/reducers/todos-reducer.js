// TODO: reducer must be a pure function
export const todosReducer = (state, action) => {
  switch (action.type) {
    case "todos/INIT":
      return action.payload;
    case "todos/ADD":
    case "todos/EDIT":
    case "todos/MOVE":
    case "todos/DELETE":
  }
};
