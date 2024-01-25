// todoStore.js

import { columns } from "../constants/columnData.js";
import { createCardInfoTemplate, createEditorTemplate } from "./templates.js";
import createStore from "./tempStore.js";

export const ADD_CARD = "ADD_CARD";
export const REGISTER_CARD = "REGISTER_CARD";
export const CANCEL_CARD = "CANCEL_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const EDIT_CARD = "EDIT_CARD";
export const SAVE_CARD = "SAVE_CARD";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const updateState = state;
      const columnId = action.payload["columnId"];
      const cardList = state[columnId];
      const newState = cardList.filter((card) => card.status !== "newCard");
      if (cardList.length !== newState.length) {
        updateState[columnId] = newState;
        return updateState;
      }

      action.payload["id"] = generateUniqueId();
      newState.unshift(action.payload);
      updateState[columnId] = newState;
      return updateState;
    }
    case REGISTER_CARD: {
      const updateState = state;
      const cardId = action.payload["id"];
      const columnId = action.payload["columnId"];
      const newState = state[columnId].map((card) => {
        if (card.id === cardId) {
          return action.payload;
        }
        return card;
      });
      updateState[columnId] = newState;
      return updateState;
    }
    case CANCEL_CARD: {
      const cardId = action.payload["id"];
      const columnId = action.payload["columnId"];
      const updateState = state;
      const newState = state[columnId].filter((card) => {
        if (card.id !== cardId) {
          return true;
        }
        if (action.payload.status === "newCard") {
          return false;
        }
        card.status = "registered";
      });
      updateState[columnId] = newState;
      return updateState;
    }
    case DELETE_CARD: {
      const columnId = action.payload["columnId"];
      const cardId = action.payload["id"];
      const updateState = state;
      const newState = state[columnId].filter((card) => card.id !== cardId);
      updateState[columnId] = newState;
      return updateState;
    }
    case EDIT_CARD: {
      const columnId = action.payload["columnId"];
      const cardId = action.payload["id"];
      const newState = state[columnId].filter((card) => {
        if (card.id === +cardId) {
          card.status = "edit";
        }
        return true;
      });
      return newState;
    }
    case SAVE_CARD: {
      const columnId = action.payload["columnId"];
      const cardId = action.payload["id"];
      const newState = state[columnId].filter((card) => {
        if (card.id === +cardId) {
          card = action.payload;
        }
        return true;
      });
      return newState;
    }
    default:
      return state;
  }
};

// 현재 날짜를 기반으로 고유한 ID 생성
function generateUniqueId() {
  const currentDate = new Date();
  const uniqueId = `id_${currentDate.getTime()}`;
  return uniqueId;
}

function render(columnId) {
  console.log(todoStore.getState());
  const cardListNode = document.getElementById(`cardList-${columnId}`);
  const state = todoStore.getState();
  const cardList = state[columnId]; //해당 column에 저장되어 있는 카드들
  cardListNode.innerHTML = "";
  for (const card of cardList) {
    const cardElement = document.createElement("div");
    cardElement.id = card.id;
    if (card.status !== "registered") {
      cardElement.className = "newCard";
      cardElement.innerHTML = createEditorTemplate(
        card.title,
        card.content,
        card.status === "edit"
      );
    } else {
      console.log(card);
      cardElement.className = "registeredCard";
      cardElement.innerHTML = createCardInfoTemplate(card);
    }
    cardListNode.appendChild(cardElement);
  }
}

export function initSetup(store) {
  store.subscribe(ADD_CARD, render);
  store.subscribe(REGISTER_CARD, render);
  store.subscribe(CANCEL_CARD, render);
  store.subscribe(DELETE_CARD, render);
  store.subscribe(EDIT_CARD, render);
  store.subscribe(SAVE_CARD, render);
}

// 여기다가 column 아이디 넣기
const initialState = {};

for (const column of columns) {
  if (!initialState[column]) {
    initialState[column.id] = [];
  }
}

const todoStore = createStore(initialState, reducer);
initSetup(todoStore);

export default todoStore;
