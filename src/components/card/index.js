import * as Alert from "../alert/index.js";
import * as EditableCard from "../editable-card/index.js";
import todoStore from "../../store/todoStore.js";

export function template({ columnId, card }) {
  return /*html*/ `
  <li data-column-id="${columnId}"
      data-card-id="${card.id}"
      class="card rounded-8 surface-default shadow-normal"
      draggable="true"
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
            <img src="./assets/icons/close.svg" width='24' height='24' />
        </button>
        <button class="card__edit-button" type="button">
            <img src="./assets/icons/edit.svg" width='24' height='24' />
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

      todoStore.dispatch({
        type: "DELETE_TODO",
        parameter: [columnId],
        payload: {
          columnId: columnId,
          cardId: cardId,
        },
      });

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

  document.querySelectorAll("textarea").forEach((element) => {
    autoTextareaHeight(element);
  });

  card.style.display = "none";
});

document.querySelectorAll("#app").forEach((element) => {
  element.addEventListener("keyup", (event) => {
    const target = event.target.closest("textarea");
    if (target) {
      autoTextareaHeight(target);
    }
  });
});

const autoTextareaHeight = (element) => {
  element.style.height = "auto";
  element.style.height = element.scrollHeight + "px";
};
