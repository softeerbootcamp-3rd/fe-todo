import { observableStore, store } from "../../store/index.js";
import { checkedFetch } from "../../utils/checked-fetch.js";
import { initializeCardsThunk } from "./initialize-cards.js";

export const addCard = async ({ data, select, onChange }) => {
  const unsubscribe = observableStore(store, select, onChange);
  await store.dispatch(addCardThunk(data));
  unsubscribe(onChange);
};

const addCardThunk = ({ columnId, title, description, author }) => {
  return (dispatch) => {
    return checkedFetch("http://localhost:8000/todos", {
      method: "POST",
      body: JSON.stringify({ columnId, title, description, author }),
    })
      .then(() => {
        dispatch(initializeCardsThunk());
      })
      .catch(console.error);
  };
};
