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

export const observableStore = (store, select = (state) => state, onChange) => {
  let currentState = {};

  const handleChange = () => {
    const nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(store.getState());
    }
  };
  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};
