import {
  addTodoListItem,
  editTodoListItem,
  getTodoList,
  insert_after,
  insert_before,
  moveTodoListItem,
  removeTodoListItem,
} from "../utils/API/todoList";
import { findItemFromTodoList, getIndexById } from "../utils/list";
import { createStore } from "../utils/store";

// requests external state update then update local state if succeeded
// views should be subscribed and change on local state change

export const todoStore = createStore((set, get) => ({
  todoList: {},
  drag: undefined,
  async fetch() {
    const newTodoList = await getTodoList();
    set((state) => ({ ...state, todoList: newTodoList }));
  },
  async add(title, item) {
    console.log("add request", title, item);
    // add new Item to todoList
    const newItem = await addTodoListItem(title, item);
    // returns newly created item (with id)
    set((state) => {
      const newList = [...state.todoList[title]];
      newList.unshift(newItem);
      return { ...state, todoList: { ...state.todoList, [title]: newList } };
    });
  },
  async remove(title, item) {
    console.log("remove request", title, item);
    // find and remove item from todoList
    await removeTodoListItem(title, item);
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
  async edit(title, item) {
    console.log("edit", title, item);
    const newItem = await editTodoListItem(title, item);
    set((state) => {
      const newTodoList = { ...state.todoList };
      for (let i = 0; i < newTodoList[title].length; i++) {
        if (newTodoList[title][i].id === item.id) {
          newTodoList[title][i] = newItem;
          break;
        }
      }
      return { ...state, todoList: newTodoList };
    });
  },
  async applyDrag() {
    if (get().drag.dst) {
      // api call
      await moveTodoListItem(
        get().drag.src.title,
        get().drag.src.id,
        get().drag.dst.title,
        get().drag.dst.id,
        get().drag.position
      );
    }
    // reset drag state
    set((state) => ({ ...state, drag: undefined }));
  },
  startDrag(title, id) {
    set((state) => ({ ...state, drag: { src: { title, id } } }));
  },
  doDrag(titleSrc, idSrc, titleDst, idDst) {
    set((state) => {
      const newTodoList = { ...state.todoList };
      const listSrc = [...newTodoList[titleSrc]];
      const listDst = [...newTodoList[titleDst]];
      const idxSrc = getIndexById(listSrc, idSrc);
      const idxDst = getIndexById(listDst, idDst);
      const item = listSrc[idxSrc];

      const newDrag = {
        ...state.drag,
        dst: { title: titleDst, id: idDst },
        position: insert_before,
      };

      if (titleSrc === titleDst) {
        // 인덱스가 큰거부터 수정
        if (idxSrc < idxDst) {
          listSrc.splice(idxDst + 1, 0, item);
          listSrc.splice(idxSrc, 1);
          newDrag.position = insert_after;
        } else {
          listSrc.splice(idxSrc, 1);
          listSrc.splice(idxDst, 0, item);
        }
        newTodoList[titleSrc] = listSrc;
      } else {
        listSrc.splice(idxSrc, 1);
        listDst.splice(idxDst, 0, item);
        newTodoList[titleSrc] = listSrc;
        newTodoList[titleDst] = listDst;
      }

      return {
        ...state,
        todoList: newTodoList,
        drag: newDrag,
      };
    });
  },
}));
