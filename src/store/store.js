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
    deleteTodoItem: [
      (todoId, todoColTitle, whereColIdx) =>
        todoColListRender(todoColTitle, todoList),
    ],
    moveTodoItem: [],
  };

  //디스패치에선 reducer와 리스너를 실행
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners[action.type]?.forEach((fn) =>
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
  const setDeleteItem = (todoColTitle, item) => {
    const todoList = getTodoList()[todoColTitle];
    for (let idx = 0; idx < todoList.length; idx++) {
      const todo = todoList[idx];
      if (item.id === todo.id) {
        state.todoList[todoColTitle].splice(idx, 1);
        break;
      }
    }
  };
  const setChangeItem = (todoId, todoColTitle, whereColIdx) => {
    const todoList = Object.entries(getTodoList());
    let findColTitle, item;
    for (let colIdx = 0; colIdx < todoList.length; colIdx++) {
      const todoColList = todoList[colIdx][1];
      for (let itemIdx = 0; itemIdx < todoColList.length; itemIdx++) {
        if (todoColList[itemIdx].id === +todoId) {
          findColTitle = todoList[colIdx][0];
          item = todoColList[itemIdx];
          //삭제 진행
          state.todoList[findColTitle].splice(itemIdx, 1);
          //수정 진행
          state.todoList[todoColTitle].splice(whereColIdx, 0, item);
          return;
        }
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
    setDeleteItem,
    setChangeItem,
    dispatch,
  };
}
