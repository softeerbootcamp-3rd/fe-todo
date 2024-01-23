import { createStore } from "./store";

let initStore = {
  todoList: {
    "해야할 일": [
      {
        title: "투두 아이템 제목 입니다.",
        content: "투두 아이템 내용입니다.",
        createdOn: "Web",
      },
      {
        title: "투두 아이템 제목 입니다.",
        content: "투두 아이템 내용입니다.",
        createdOn: "Web",
      },
    ],
    "하고 있는 일": [],
    "완료한 일": [],
  },
  history: [
    {
      authorName: "쓴 사람 이름입니다",
      timeStamp: 18121312312,
      actionId: 0,
      todoTitle: "새로운 투두",
      todoSrc: null,
      todoDst: null,
    },
  ],
};

localStorage.setItem("data", JSON.stringify(initStore));

const store = createStore(initStore, reducer);

// reducer함수 구현
function reducer(state = {}, action) {
  //값을 받아서 state에 추가
  if (action.type === "plusTodoItem") {
    const item = action.payload.item;
    const todoColTitle = action.payload.todoColTitle;
    state.todoList[todoColTitle].unshift(item);

    return {
      ...state,
    };
  }

  return state;
}

function showState() {
  console.log(store.getState());
}

store.subscribe(showState);

export { store };
