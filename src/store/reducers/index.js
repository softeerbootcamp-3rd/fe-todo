import { historyReducer } from "./history-reducer.js";
import { todosReducer } from "./todos-reducer.js";
import { combineReducer } from "../core/combine-reducers.js";

export const reducers = combineReducer({
  todos: todosReducer,
  history: historyReducer,
});
