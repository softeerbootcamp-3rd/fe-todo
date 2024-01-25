import todoList from "../todoList";
import styles from "./todoListTable.module.scss";
import { todoStore } from "../../stores/todoStore";
import { deepEqualList } from "../../utils/list";
import { useStore } from "../../utils/store";
import { createComponent } from "../../utils/ui";

export default function todoListTable(renderTarget, initialData) {
  //행 + 데이터를 모두 감싸고 있는 컨테이너 (테이블)
  const views = mount(renderTarget, initialData);
  const store = attachStore(views, initialData);
  attachHandlers(views, store, initialData);
  return store.destroy;
}

function attachStore({ todoListTable }, initialData) {
  const childComponents = new Map();
  const updateView = (listTitles) => {
    if (listTitles === undefined) return;
    // reset mounted flag
    for (const component of childComponents.values()) {
      component.mounted = false;
    }

    // create & mount components in order one by one
    let previousElement = undefined;
    for (const title of listTitles) {
      console.log("mount", title);
      let component = childComponents.get(title);
      if (!component) {
        // 맵에 없음: 새로 생성
        component = createComponent(todoList, { title });
        childComponents.set(title, component);
      }

      if (!previousElement) todoListTable.appendChild(component.element);
      else previousElement.insertAdjacentElement("afterend", component.element);
      component.mounted = true;
      previousElement = component.element;
    }

    // destroy unmounted components
    for (const [title, component] of childComponents.entries()) {
      if (component.mounted) continue;
      component.element.parentNode.removeChild(component.element);
      component.destroy();
      childComponents.delete(title);
    }
  };

  const store = useStore(
    todoStore,
    updateView,
    (state) => Object.keys(state.todoList),
    deepEqualList
  );

  // fetch initial todo data
  todoStore.getState().fetch();

  return store;
}

function attachHandlers({}, {}, initialData) {}

function mount(renderTarget, initialData) {
  renderTarget.innerHTML = /*html*/ `
    <div data-node="todoListTable" class="${styles.todoListTable}">
    </div>
  `;

  const todoListTable = renderTarget.querySelector(
    '[data-node="todoListTable"]'
  );
  return { renderTarget, todoListTable };
}
