import { observableStore, store } from "../../store/index.js";
import { checkedFetch } from "../../utils/checked-fetch.js";
import { initializeCardsThunk } from "./initialize-cards.js";

export const deleteCard = async ({ data, select, onChange }) => {
  const unsubscribe = observableStore(store, select, onChange);
  await store.dispatch(deleteCardThunk(data));
  unsubscribe(onChange);
};

const deleteCardThunk = ({ columnId, cardId }) => {
  return (dispatch) => {
    return checkedFetch(`http://localhost:8000/todos/${columnId}/${cardId}`, {
      method: "DELETE",
    })
      .then(() => dispatch(initializeCardsThunk()))
      .catch(console.error);
  };
};
