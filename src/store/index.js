// TODO: columns and history reducer
// TODO: reducer must be a pure function
const todoReducer = (state, action) => {};
const historyReducer = (state, action) => {};

// TODO: implement createStore
// FIXME: use ES class
const createStore = (reducer, initialState, middleware) => {
  let currentState = initialState;
  let listeners = [];

  const getState = () => {
    return currentState;
  };

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      const index = listeners.indexOf(listener);
      listeners.slice(index, 1);
    };
  };

  const dispatch = (action) => {
    currentState = reducer(currentState, action);

    listeners.forEach((listener) => listener());
    return action;
  };

  return { getState, subscribe, dispatch };
};

const reducers = combineReducer(todoReducer, historyReducer);

export const store = createStore(reducers);
