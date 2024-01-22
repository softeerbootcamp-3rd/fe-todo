const pick = (obj, fn) => {
  return Object.keys(obj).reduce((result, key) => {
    if (fn(obj[key])) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

const mapValue = (obj, fn) => {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = fn(obj[key], key);
    return result;
  }, {});
};

export const combineReducer = (reducers) => {
  const finalReducers = pick(reducers, (val) => typeof val === "function");

  return (state = {}, action) =>
    mapValue(finalReducers, (reducer, key) => reducer(state[key], action));
};
