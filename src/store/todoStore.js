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
  const columnData = state.columnData;
  const targetColumn = columnData.find(({ id }) => id === payload.columnId);
  targetColumn.cards = [payload.newCard, ...targetColumn.cards];

  // actionHistory state 변경
  const newActionHistory = {
    actionType: ADD_TODO,
    cardTitle: payload.newCard.title,
    prevColumn: targetColumn.columnName,
    curColumn: targetColumn.columnName,
    createdAt: new Date().getTime(),
  };
  return {
    columnData: columnData,
    actionHistory: [newActionHistory, ...state.actionHistory],
  };
};

// 투두 카드 삭제
const deleteTodo = (state, payload) => {
  const columnData = state.columnData;
  const targetColumn = columnData.find(({ id }) => id === payload.columnId);
  const deleteCard = targetColumn.cards.find(({ id }) => id !== payload.cardId);
  targetColumn.cards = targetColumn.cards.filter((card) => card !== deleteCard);

  // actionHistory state 변경
  const newActionHistory = {
    actionType: DELETE_TODO,
    cardTitle: deleteCard.title,
    prevColumn: targetColumn.columnName,
    curColumn: targetColumn.columnName,
    createdAt: new Date().getTime(),
  };
  return {
    columnData: columnData,
    actionHistory: [newActionHistory, ...state.actionHistory],
  };
};

// 투두 카드 수정
const editTodo = (state, payload) => {
  const columnData = state.columnData;
  const targetColumn = columnData.find(({ id }) => id === payload.columnId);
  const targetCardIndex = targetColumn.cards.findIndex(
    ({ id }) => id === payload.cardId
  );

  // 기존 카드 데이터 덮어쓰기
  targetColumn.cards[targetCardIndex] = {
    ...targetColumn.cards[targetCardIndex],
    ...payload.editedCard,
  };

  // actionHistory state 변경
  const newActionHistory = {
    actionType: EDIT_TODO,
    cardTitle: payload.editedCard.title,
    prevColumn: targetColumn.columnName,
    curColumn: targetColumn.columnName,
    createdAt: new Date().getTime(),
  };

  return {
    columnData: columnData,
    actionHistory: [newActionHistory, ...state.actionHistory],
  };
};

// 투두 카드 이동
const moveTodo = (state, payload) => {
  const columnData = state.columnData;
  const originColumn = columnData.find(
    ({ id }) => id === payload.originColumnId
  );
  const movedColumn = columnData.find(({ id }) => id === payload.movedColumnId);

  const movedCard = originColumn.cards.find(({ id }) => id === payload.cardId);
  originColumn.cards = originColumn.cards.filter((card) => movedCard !== card);
  movedColumn.cards.splice(payload.movedIndex, 0, movedCard);

  // actionHistory state 변경
  const newActionHistory = {
    actionType: MOVE_TODO,
    cardTitle: movedCard.title,
    prevColumn: originColumn.columnName,
    curColumn: movedColumn.columnName,
    createdAt: new Date().getTime(),
  };

  return {
    columnData: columnData,
    actionHistory: [newActionHistory, ...state.actionHistory],
  };
};
