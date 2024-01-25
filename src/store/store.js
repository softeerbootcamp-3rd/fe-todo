import { todoColListRender } from "../utils/render/todoColListRender";
import { todoCountRender } from "../utils/render/todoCountRender";

export function createStore(initStore, reducer) {
  let state = {
    ...initStore,
  };

  //리스너에선 어떤 액션일때 어떤 렌더링 함수를 시킬지 정함
  const listeners = {
    plusTodoItem: [
      ({ todoColTitle }) => {
        const colTodoList = getColTodoList(todoColTitle);
        todoColListRender(todoColTitle, colTodoList);
      },
    ],
    updateTodoItem: [
      ({ todoColTitle }) => {
        const colTodoList = getColTodoList(todoColTitle);
        todoColListRender(todoColTitle, colTodoList);
      },
    ],
    deleteTodoItem: [
      ({ todoColTitle }) => {
        const colTodoList = getColTodoList(todoColTitle);
        todoColListRender(todoColTitle, colTodoList);
      },
    ],
    changeTodoItem: [
      ({ todoColTitleSrc, todoColTitleDst }) => {
        todoCountRender(todoColTitleSrc, getColTodoCount(todoColTitleSrc));
        todoCountRender(todoColTitleDst, getColTodoCount(todoColTitleDst));
      },
    ],
  };

  //디스패치에선 reducer와 리스너를 실행
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners[action.type]?.forEach((fn) => fn(action.payload));
  };

  //get함수
  const getState = () => ({ ...state });
  const getHistory = () => ({ ...state.history });
  const getTodoList = () => ({ ...state.todoList });
  const getColTodoList = (todoColTitle) => ({
    ...state.todoList[todoColTitle],
  });
  const getColTodoCount = (todoColTitle) => {
    return state.todoList[todoColTitle].length;
  };

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
        console.log(state.todoList[todoColTitle]);
        break;
      }
    }
  };
  const setChangeItem = (
    startColIndex,
    todoColTitleSrc,
    endColIndex,
    todoColTitleDst
  ) => {
    //const todoList = getTodoList();
    const moveItem = state.todoList[todoColTitleSrc].splice(startColIndex, 1);
    state.todoList[todoColTitleDst].splice(endColIndex, 0, ...moveItem);
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
