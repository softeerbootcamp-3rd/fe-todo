import { todoColListRender } from "../utils/render/todoColListRender";

export function createStore(initStore, reducer) {
  let state = {
    ...initStore,
  };

  const listeners = [];

  const dispatch = (action) => {
    state = reducer(state, action);
    if (action.type === "plusTodoItem") {
      todoColListRender(
        action.payload.todoColTitle,
        getColTodoList(action.payload.todoColTitle)
      );
    }

    //listeners.forEach((fn) => fn());
  };

  const getState = () => ({ ...state });
  const getHistory = () => ({ ...state.history });
  const getTodoList = () => ({ ...state.todoList });
  const getColTodoList = (todoColTitle) => ({
    ...state.todoList[todoColTitle],
  });

  const setPlusItem = (todoColTitle, item) => {
    state.todoList[todoColTitle].unshift(item);
  };

  const subscribe = (fn) => listeners.push(fn);

  return {
    getState,
    getTodoList,
    getHistory,
    getColTodoList,
    dispatch,
    subscribe,
    setPlusItem,
  };
}
