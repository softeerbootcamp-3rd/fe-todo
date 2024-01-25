import { reducers } from "./reducers/index.js";
import { applyMiddleware } from "./core/apply-middleware.js";
import { thunk } from "./core/thunk.js";
import { createStore } from "./core/create-store.js";

const initialState = {
  todos: [],
  history: [],
};

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk)
);

export const observableStore = (store, select, onChange) => {
  let currentState = {};

  const handleChange = () => {
    // FIXME use select
    const nextState = store.getState();
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(store.getState());
    }
  };
  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};
