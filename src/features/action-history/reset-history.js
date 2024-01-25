import { observableStore, store } from "../../store/index.js";
import { checkedFetch } from "../../utils/checked-fetch.js";

export const resetHistory = async ({ select, onChange }) => {
  const unsubscribe = observableStore(store, select, onChange);
  await store.dispatch(resetHistoryThunk());
  unsubscribe(onChange);
};

const resetHistoryThunk = () => {
  return (dispatch) => {
    return checkedFetch("http://localhost:8000/history", {
      method: "DELETE",
    })
      .then(() => dispatch(initializeHistory()))
      .catch(console.error);
  };
};
