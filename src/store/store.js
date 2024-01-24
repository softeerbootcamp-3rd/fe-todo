import { todoColListRender } from "../utils/render/todoColListRender";

export function createStore(initStore, reducer) {
  let state = {
    ...initStore,
  };

  //리스너에선 어떤 액션일때 어떤 렌더링 함수를 시킬지 정함
  const listeners = {
    plusTodoItem: [
      (todoColTitle, todoList) => todoColListRender(todoColTitle, todoList),
    ],
    updateTodoItem: [
      (todoColTitle, todoList) => todoColListRender(todoColTitle, todoList),
    ],
  };

  //디스패치에선 reducer와 리스너를 실행
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners[action.type].forEach((fn) =>
      fn(
        action.payload.todoColTitle,
        getColTodoList(action.payload.todoColTitle)
      )
    );
  };

  //get함수
  const getState = () => ({ ...state });
  const getHistory = () => ({ ...state.history });
  const getTodoList = () => ({ ...state.todoList });
  const getColTodoList = (todoColTitle) => ({
    ...state.todoList[todoColTitle],
  });

  //set함수
  const setPlusItem = (todoColTitle, item) => {
    state.todoList[todoColTitle].unshift(item);
  };
  const setUpdateItem = (todoColTitle, item) => {
    const todoList = getTodoList()[todoColTitle];
    for (let idx = 0; idx < todoList.length; idx++) {
      const todo = todoList[idx];
      if (item.id === todo.id) {
        state.todoList[todoColTitle][idx] = item;
        break;
      }
    }
  };

  return {
    getState,
    getTodoList,
    getHistory,
    getColTodoList,
    setPlusItem,
    setUpdateItem,
    dispatch,
  };
}
