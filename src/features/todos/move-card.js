import { store, observableStore } from "../../store/index.js";
import { checkedFetch } from "../../utils/checked-fetch.js";
import { initializeCardsThunk } from "./initialize-cards.js";

export const moveCard = async ({ data, select, onChange }) => {
  const unsubscribe = observableStore(store, select, onChange);
  await store.dispatch(moveCardThunk(data));
  unsubscribe(onChange);
};

const moveCardThunk = ({ columnId, cardId, currentColumnId }) => {
  return (dispatch) => {
    return checkedFetch(`http://localhost:8000/todos/${columnId}/${cardId}`, {
      method: "PATCH",
      body: JSON.stringify({ currentColumnId }),
    })
      .then(() => dispatch(initializeCardsThunk()))
      .catch(console.error);
  };
};
