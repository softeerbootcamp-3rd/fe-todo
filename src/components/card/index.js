import * as Column from "../column/index.js";
import * as Alert from "../alert/index.js";
import * as EditableCard from "../editable-card/index.js";
import { getLocalStorage, setLocalStorage } from "../../utils/local-storage.js";

export function template({ columnId, card }) {
  return `
  <li data-column-id="${columnId}"
      data-card-id="${card.id}"
      class="card rounded-8 surface-default shadow-normal"
    >
    <div class="card__contents">
        <h3 class="card__title text-strong display-bold14">
            ${card.title}
        </h3>
        <p class="card__description text-default display-medium14">
            ${card.description}
        </p>
        <span class="card__author text-weak display-medium12">
            author by ${card.author}
        </span>
    </div>
    <div class="card__buttons">
        <button class="card__delete-button" type="button">
            <img src="./assets/icons/close.svg" />
        </button>
        <button class="card__edit-button" type="button">
            <img src="./assets/icons/edit.svg" />
        </button>
    </div>
  </li>
    `;
}

document.querySelector("#app").addEventListener("click", (event) => {
  const target = event.target.closest(".card__delete-button");
  if (target === null) {
    return;
  }

  Alert.show({
    message: "선택한 카드를 삭제할까요?",
    onConfirm: () => {
      const card = target.closest(".card");
      const columnId = card.getAttribute("data-column-id");
      const cardId = card.getAttribute("data-card-id");

      const todolist = getLocalStorage("todolist");
      const selectedColumnIndex = todolist.findIndex(
        (item) => item.id === Number(columnId)
      );
      todolist[selectedColumnIndex].cards = todolist[
        selectedColumnIndex
      ].cards.filter((card) => card.id !== Number(cardId));
      setLocalStorage("todolist", todolist);

      // NOTE: 특정 칼럼에 대한 카드 리렌더링
      const column = document.querySelector(
        `.column[data-column-id="${columnId}"]`
      );
      column.innerHTML = `${Column.template({
        column: getLocalStorage("todolist")[selectedColumnIndex],
      })}`;

      Alert.close();
    },
  });
});

document.querySelector("#app").addEventListener("click", (event) => {
  const target = event.target.closest(".card__edit-button");
  if (target === null) {
    return;
  }

  const card = target.closest(".card");
  const columnId = card.getAttribute("data-column-id");
  const cardId = card.getAttribute("data-card-id");
  const title = card.querySelector(".card__title").innerText;
  const description = card.querySelector(".card__description").innerText;

  card.insertAdjacentHTML(
    "beforebegin",
    EditableCard.template({ columnId, cardId, title, description })
  );
  card.style.display = "none";
});
