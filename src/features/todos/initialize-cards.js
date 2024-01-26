import { observableStore, store } from "../../store/index.js";
import { checkedFetch } from "../../utils/checked-fetch.js";

export const initializeCards = async ({ select, onChange }) => {
  const unsubscribe = observableStore(store, select, onChange);
  await store.dispatch(initializeCardsThunk());
  unsubscribe(onChange);
};

export const initializeCardsThunk = () => {
  return (dispatch) => {
    return checkedFetch("http://localhost:8000/todos")
      .then((todos) => {
        dispatch({ type: "todos/INIT", payload: todos });
      })
      .catch(console.error);
  };
};
