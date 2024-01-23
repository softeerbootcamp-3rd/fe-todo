import { reducers } from "./reducers/index.js";
import { applyMiddleware } from "./core/apply-middleware.js";
import { thunk } from "./core/thunk.js";
import { createStore } from "./core/create-store.js";

const initialState = {
  todolist: [],
  history: [],
};

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk)
);
