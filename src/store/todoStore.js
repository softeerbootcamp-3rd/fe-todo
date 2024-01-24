import { createStore } from "./store.js";

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO = "EDIT_TODO";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return addTodo(state, action);
    case DELETE_TODO:
      return deleteTodo(state, action);
    case EDIT_TODO:
      return editTodo(state, action);
    default:
      return state;
  }
};

const initialState = [];
const todoStore = createStore(initialState, reducer);
export default todoStore;

// 투두 카드 추가
const addTodo = (state, action) => {
  const targetColumn = state.find(({ id }) => id == action.columnId);
  targetColumn.cards = [action.payload, ...targetColumn.cards];
  return state;
};

// 투두 카드 삭제
const deleteTodo = (state, action) => {
  const targetColumn = state.find(({ id }) => id == action.columnId);
  targetColumn.cards = targetColumn.cards.filter(
    ({ id }) => id != action.payload
  );
  return state;
};

// 투두 카드 수정
const editTodo = (state, action) => {
  const targetColumn = state.find(({ id }) => id == action.columnId);
  const targetCardIndex = targetColumn.cards.findIndex(
    ({ id }) => id == action.payload.cardId
  );

  // 기존 카드 데이터 덮어쓰기
  targetColumn.cards[targetCardIndex] = {
    ...targetColumn.cards[targetCardIndex],
    ...action.payload.editedCard,
  };
  return state;
};
