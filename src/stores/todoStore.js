import {
  addTodoListItem,
  editTodoListItem,
  getTodoList,
  removeTodoListItem,
} from "../utils/API/todoList";
import { createStore } from "../utils/store";

// requests external state update then update local state if succeeded
// views should be subscribed and change on local state change

export const todoStore = createStore((set, get) => ({
  todoList: getTodoList(), // initial todolist data
  add: (title, item) => {
    console.log("add request", title, item);
    // add new Item to todoList
    const newItem = addTodoListItem(title, item);
    // returns newly created item (with id)
    set((state) => {
      const newList = [...state.todoList[title]];
      newList.unshift(newItem);
      return { ...state, todoList: { ...state.todoList, [title]: newList } };
    });
  },
  remove: (title, item) => {
    console.log("remove request", title, item);
    // find and remove item from todoList
    removeTodoListItem(title, item);
    set((state) => {
      const newList = [...state.todoList[title]];
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].id === item.id) {
          newList.splice(i, 1);
          break;
        }
      }
      return { ...state, todoList: { ...state.todoList, [title]: newList } };
    });
  },
  edit: (title, item) => {
    console.log("edit", title, item);
    editTodoListItem(title, item);
    set((state) => {
      const newTodoList = { ...state.todoList };
      for (let i = 0; i < newTodoList[title].length; i++) {
        if (newTodoList[title][i].id === item.id) {
          newTodoList[title][i] = item;
          break;
        }
      }
      return { ...state, todoList: newTodoList };
    });
  },
}));

// TODO: moveItem
