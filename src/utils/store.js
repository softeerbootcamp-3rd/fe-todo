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

    console.log("setState", nextState);

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

export function useStore(store, callback, selector, equalityFunction) {
  const storeObj = {
    data: undefined, // store에서 받아온 데이터가 저장되는 곳, 계속 업데이트됨
    destroy: undefined, // store에 unsub 할때 실행할 함수
  };

  const destroy = store.subscribe(
    (data) => {
      storeObj.data = data;
      callback(data);
    },
    selector,
    equalityFunction
  );
  storeObj.destroy = () => {
    destroy();
    console.log("destroyed:", storeObj.data);
  };
  return storeObj;
}
