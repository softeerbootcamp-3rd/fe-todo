import { historyReducer } from "./history-reducer.js";
import { todoReducer } from "./todo-reducer.js";
import { combineReducer } from "../core/combine-reducers.js";

export const reducers = combineReducer({
  todolist: todoReducer,
  history: historyReducer,
});
