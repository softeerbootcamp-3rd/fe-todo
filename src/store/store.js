import { todoColListRender } from "../utils/render/todoColListRender";
import { todoCountRender } from "../utils/render/todoCountRender";
import { renderHistoryList } from "../utils/render/renderHistoryList";

export function createStore(initStore, reducer) {
  let state = {
    ...initStore,
  };

  //리스너에선 어떤 액션일때 어떤 렌더링 함수를 시킬지 정한다.
  const listeners = {
    plusTodoItem: [
      ({ todoColTitle }) => {
        const colTodoList = getColTodoList(todoColTitle);
        todoColListRender(todoColTitle, colTodoList);
        renderHistoryList(getHistory());
      },
    ],
    updateTodoItem: [
      ({ todoColTitle }) => {
        const colTodoList = getColTodoList(todoColTitle);
        todoColListRender(todoColTitle, colTodoList);
        renderHistoryList(getHistory());
      },
    ],
    deleteTodoItem: [
      ({ todoColTitle }) => {
        const colTodoList = getColTodoList(todoColTitle);
        todoColListRender(todoColTitle, colTodoList);
        renderHistoryList(getHistory());
      },
    ],
    moveTodoItem: [
      ({ todoColTitleSrc, todoColTitleDst }) => {
        todoCountRender(todoColTitleSrc, getColTodoCount(todoColTitleSrc));
        todoCountRender(todoColTitleDst, getColTodoCount(todoColTitleDst));
        renderHistoryList(getHistory());
      },
    ],
    deleteAllHistory: [
      () => {
        renderHistoryList(getHistory());
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
  const getHistory = () => {
    return state.history;
  };
  const getTodoList = () => ({ ...state.todoList });
  const getColTodoList = (todoColTitle) => ({
    ...state.todoList[todoColTitle],
  });
  const getColTodoCount = (todoColTitle) => {
    return state.todoList[todoColTitle].length;
  };

  // history 관련 set함수
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
  const setChangeItem = (
    startColIndex,
    todoColTitleSrc,
    endColIndex,
    todoColTitleDst
  ) => {
    const moveItem = state.todoList[todoColTitleSrc].splice(startColIndex, 1);
    state.todoList[todoColTitleDst].splice(endColIndex, 0, ...moveItem);
  };

  // history 관련 set함수
  // FIXME: historyItem을 리턴하는 함수를 하나 만들어서 간략하게 하자.
  const setPlusHistory = (todoColTitle, item) => {
    const historyItem = {
      authorName: "멋진삼",
      timeStamp: new Date().getTime(),
      actionKind: "등록",
      todoTitle: item.title,
      todoSrc: todoColTitle,
      todoDst: null,
    };
    state.history.unshift(historyItem);
  };

  const setRemoveHistory = (todoColTitle, item) => {
    const historyItem = {
      authorName: "멋진삼",
      timeStamp: new Date().getTime(),
      actionKind: "삭제",
      todoTitle: item.title,
      todoSrc: todoColTitle,
      todoDst: null,
    };
    state.history.unshift(historyItem);
  };

  const setEditHistory = (item) => {
    const historyItem = {
      authorName: "멋진삼",
      timeStamp: new Date().getTime(),
      actionKind: "수정",
      todoTitle: item.title,
      todoSrc: null,
      todoDst: null,
    };
    state.history.unshift(historyItem);
  };

  const setMoveHistory = (todoTitle, todoColTitleSrc, todoColTitleDst) => {
    const historyItem = {
      authorName: "멋진삼",
      timeStamp: new Date().getTime(),
      actionKind: "이동",
      todoTitle: todoTitle,
      todoSrc: todoColTitleSrc,
      todoDst: todoColTitleDst,
    };
    state.history.unshift(historyItem);
  };

  const setRemoveAllHistory = () => {
    console.log(state.history);
    state.history = [];
  };

  return {
    getState,
    getTodoList,
    getHistory,
    getColTodoList,
    setPlusItem,
    setPlusHistory,
    setEditHistory,
    setRemoveHistory,
    setMoveHistory,
    setUpdateItem,
    setDeleteItem,
    setChangeItem,
    setRemoveAllHistory,
    dispatch,
  };
}
