export const applyMiddleware = (...middlewares) => {
  return (createStore) => (reducer, initialState) => {
    const store = createStore(reducer, initialState);
    const chain = middlewares.map((middleware) =>
      middleware({
        getState: store.getState,
        dispatch: (action) => store.dispatch(action),
      })
    );
    const dispatch = chain.reduce(
      (a, b) =>
        (...arg) =>
          a(b(...arg))
    )(store.dispatch);

    return {
      ...store,
      dispatch,
    };
  };
};
