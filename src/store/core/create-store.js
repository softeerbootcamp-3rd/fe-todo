// FIXME: use ES class
export const createStore = (reducer, enhancer, initialState = {}) => {
  if (typeof enhancer === "function") {
    enhancer(createStore)(reducer, initialState);
  }
  let currentState = initialState;
  let listeners = [];
  let isDispatchingAction = false;

  const getState = () => {
    return currentState;
  };

  const subscribe = (listener) => {
    listeners.push(listener);

    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.slice(index, 1);
    };
  };

  const dispatch = (action) => {
    if (isDispatchingAction) {
      throw new Error("The action is dispatching");
    }
    try {
      isDispatchingAction = true;
      currentState = reducer(currentState, action);
    } finally {
      isDispatchingAction = false;
    }

    listeners.forEach((listener) => listener());
    return action;
  };

  const store = { getState, subscribe, dispatch };
  return store;
};
