// see https://github.com/reduxjs/redux-thunk/blob/98bffb1c547fb0dac2d8ebe002778bc644d3b2d2/src/index.ts

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
