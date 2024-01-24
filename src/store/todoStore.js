import { createStore } from "./store.js";

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const MOVE_TODO = "MOVE_TODO";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return addTodo(state, action.payload);
    case DELETE_TODO:
      return deleteTodo(state, action.payload);
    case EDIT_TODO:
      return editTodo(state, action.payload);
    case MOVE_TODO:
      return moveTodo(state, action.payload);
    default:
      return state;
  }
};

const initialState = [];
const todoStore = createStore(initialState, reducer);
export default todoStore;

// 투두 카드 추가
const addTodo = (state, payload) => {
  const targetColumn = state.find(({ id }) => id == payload.columnId);
  targetColumn.cards = [payload.newCard, ...targetColumn.cards];
  return state;
};

// todoStore.dispatch({
//   type: "DELETE_TODO",
//   parameter: [columnId],
//   payload: {
//     columnId: columnId,
//     cardId: cardId,
//   }
// });

// 투두 카드 삭제
const deleteTodo = (state, payload) => {
  const targetColumn = state.find(({ id }) => id == payload.columnId);
  targetColumn.cards = targetColumn.cards.filter(
    ({ id }) => id != payload.cardId
  );
  return state;
};

// todoStore.dispatch({
//   type: "EDIT_TODO",
//   parameter: [columnId],
//   payload: {
//     columnId: columnId,
//     cardId: cardId,
//     editedCard: {
//       title: title,
//       description: description,
//     },
//   },
// });

// 투두 카드 수정
const editTodo = (state, payload) => {
  const targetColumn = state.find(({ id }) => id == payload.columnId);
  const targetCardIndex = targetColumn.cards.findIndex(
    ({ id }) => id == payload.cardId
  );

  // 기존 카드 데이터 덮어쓰기
  targetColumn.cards[targetCardIndex] = {
    ...targetColumn.cards[targetCardIndex],
    ...payload.editedCard,
  };
  return state;
};

// todoStore.dispatch({
//   type: "MOVE_TODO",
//   parameter: [originColumnId, movedColumnId]
//   payload: {
//     originColumnId: originColumnId,
//     movedColumnId: movedColumn.getAttribute("data-column-id"),
//     movedIndex: movedIndex,
//     cardId: cardId,
//   },
// });

// 투두 카드 이동
const moveTodo = (state, payload) => {
  const originColumn = state.find(({ id }) => id == payload.originColumnId);
  const movedColumn = state.find(({ id }) => id == payload.movedColumnId);

  const movedCard = originColumn.cards.find(({ id }) => id == payload.cardId);
  originColumn.cards = originColumn.cards.filter((card) => movedCard !== card);

  movedColumn.cards.splice(payload.movedIndex, 0, movedCard);
  return state;
};
