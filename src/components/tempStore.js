// Store.js

export default function createStore(initialState, reducer) {
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
  const publish = (action) => {
    if (!events[action.type]) {
      return;
    }
    events[action.type].map((cb) => cb(action.payload.columnId));
  };

  // 상태에 이벤트와 필요한 데이터를 보내는 함수
  const dispatch = (action) => {
    // action에는 type(이벤트), payload(데이터)가 있음
    state = reducer(state, action);
    publish(action);
  };

  const getState = () => state;

  return {
    getState,
    subscribe,
    dispatch,
  };
}
