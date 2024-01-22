const createThunkMiddleware = () => {
  const middleware =
    ({ getState, dispatch }) =>
    (next) =>
    (action) => {
      if (typeof action === "function") {
        return action(dispatch, getState);
      }
      return next(action);
    };

  return middleware;
};

export const thunk = createThunkMiddleware();
