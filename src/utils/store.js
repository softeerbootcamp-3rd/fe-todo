// 참고:
// https://github.com/pmndrs/zustand/blob/main/src/vanilla.ts
// https://ui.toast.com/weekly-pick/ko_20210812

export function createStore(initializer) {
  // 변경될때마다 실행해줄 리스너들
  let state;
  const listeners = new Set();
  const getState = () => state;
  const subscribe = (
    listener,
    selector = getState,
    equalityFunction = Object.is
  ) => {
    // create listener
    let prevSlice = undefined;
    function newListener() {
      const newSlice = selector(state);
      if (!equalityFunction(prevSlice, newSlice)) {
        prevSlice = newSlice;
        listener(newSlice);
      }
    }
    listeners.add(newListener);

    // run on subscribe
    newListener();

    // returns unsubscribe callback
    return () => listeners.delete(newListener);
  };

  const setState = (setterOrValue) => {
    const nextState =
      typeof setterOrValue === "function"
        ? setterOrValue(state)
        : setterOrValue;

    if (nextState === state) return;
    // update state
    state = Object.assign({}, state, nextState);
    // callbacks
    listeners.forEach((listener) => listener());
  };

  const api = { getState, subscribe };
  state = initializer(setState, getState);
  return api;
}
