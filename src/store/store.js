import todoItem from "../components/todoItem";

export function createStore(initStore, reducer) {
  let state = {
    ...initStore,
  };

  const listeners = [];

  const dispatch = (action) => {
    state = reducer(state, action);

    if (action.type === "plusTodoItem") {
      const todoColTitle = action.payload.todoColTitle;

      const colContainer = document.getElementById(`todoCol_${todoColTitle}`);
      state.todoList[todoColTitle].forEach((todo) => {
        todoItem(colContainer, {
          todoColTitle: todo.title,
          todo,
          onDeleteItem: () => {
            onDeleteCountDown(itemCount);
          },
        });
      });
    }
    //listeners.forEach((fn) => fn());
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
