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
    // add new Item to todoList
    const newItem = addTodoListItem(title, item);
    // returns newly created item (with id)
    set((state) => {
      const newTodoList = { ...state.todoList };
      newTodoList[title].unshift(newItem);
      return { ...state, todoList: newTodoList };
    });
  },
  remove: (title, item) => {
    // find and remove item from todoList
    removeTodoListItem(title, item);
    set((state) => {
      const newTodoList = { ...state.todoList };
      for (let i = 0; i < newTodoList[title].length; i++) {
        if (newTodoList[title][i].id === item.id) {
          newTodoList[title].splice(i, 1);
          break;
        }
      }
      return { ...state, todoList: newTodoList };
    });
  },
  edit: (title, item) => {
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
