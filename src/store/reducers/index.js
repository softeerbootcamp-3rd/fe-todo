import { todoReducer } from "./todo-reducer.js";
import { historyReducer } from "./history-reducer.js";
import { combineReducer } from "../utils/combine-reducers.js";

export const reducers = combineReducer({
  todolist: todoReducer,
  history: historyReducer,
});
