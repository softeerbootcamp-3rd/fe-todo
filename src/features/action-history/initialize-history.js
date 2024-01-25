import { observableStore, store } from "../../store/index.js";
import { checkedFetch } from "../../utils/checked-fetch.js";

export const initializeHistory = async ({ select, onChange }) => {
  const unsubscribe = observableStore(store, select, onChange);
  await store.dispatch(initializeHistoryThunk());
  unsubscribe(onChange);
};

export const initializeHistoryThunk = () => {
  return (dispatch) => {
    return checkedFetch("http://localhost:8000/history")
      .then((history) => {
        dispatch({ type: "history/INIT", payload: history });
      })
      .catch(console.error);
  };
};
