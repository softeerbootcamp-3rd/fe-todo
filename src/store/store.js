import { setLocalStorage } from "../utils/local-storage.js";

export const createStore = (initialState, reducer) => {
  let state = initialState;
  const events = {};

  // 상태 변화 시 실행할 함수 등록
  const subscribe = (actionType, eventCallback) => {
    if (!events[actionType]) {
      events[actionType] = [];
    }
    events[actionType].push(eventCallback);
  };

  // 이벤트에 해당하는 함수 모두 실행
  const publish = (actionType) => {
    if (!events[actionType]) {
      return;
    }

    events[actionType].map((cb) => cb());
  };

  // 상태에 이벤트와 필요한 데이터를 보내는 함수
  const dispatch = (action) => {
    // action: type(event), payload: data
    // 변경된 state 받아옴
    state = reducer(state, action);
    setLocalStorage("todolist", state);
    publish(action.type + (action.columnId ? action.columnId : ""));
  };

  const getState = () => state;

  const setState = (payload) => {
    state = [...payload];
  };

  return {
    getState,
    subscribe,
    dispatch,
    setState,
  };
};
