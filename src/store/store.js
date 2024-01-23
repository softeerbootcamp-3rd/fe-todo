export function createStore(initStore, reducer) {
  let state = {
    ...initStore,
  };

  const listeners = [];

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((fn) => fn());
  };

  const getState = () => ({ ...state });
  const getHistory = () => ({ ...state.history });
  const getTodoList = () => ({ ...state.todoList });

  const subscribe = (fn) => listeners.push(fn);

  return {
    getState,
    getTodoList,
    getHistory,
    dispatch,
    subscribe,
  };
}
