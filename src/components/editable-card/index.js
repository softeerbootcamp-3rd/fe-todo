import { getLocalStorage, setLocalStorage } from "../../utils/local-storage.js";
import * as Column from "../column/index.js";

export function template({ columnId, cardId, title, description }) {
  return `
    <li class="card__editable rounded-8 surface-default shadow-normal"
        data-card-id=${cardId}
        data-column-id=${columnId}
    >
      <div class="card__contents" data-column-id=${columnId}>
        <input
            class="card__title-input display-bold14 text-strong"
            type="text"
            value="${title}"
            placeholder="제목을 입력하세요"
            />
            <input
            class="card__description-input display-medium14 text-default"
            type="text"
            value="${description}"
            placeholder="내용을 입력하세요"
        />
      </div>
      <div class="card__editable-buttons">
        <button 
            data-column-id=${columnId}
            class="cancel-button button rounded-8 surface-alt display-bold14 text-default"
            type="button"
        >
          취소
        </button>
        <button 
            data-column-id=${columnId}
            class="edit-button button rounded-8 surface-brand display-bold14 text-white-default"
            type="button"
        >
          저장
        </button>
      </div>
    </li>
    `;
}

document.querySelector("#app").addEventListener("click", (event) => {
  const target = event.target.closest(
    ".card__editable-buttons > .cancel-button"
  );
  if (target === null) {
    return;
  }

  const editableCard = target.closest(".card__editable[data-card-id]");
  const cardId = editableCard.getAttribute("data-card-id");
  const card = document.querySelector(`.card[data-card-id="${cardId}"]`);

  editableCard.remove();
  card.style.display = "flex";
});

document.querySelector("#app").addEventListener("click", (event) => {
  const target = event.target.closest(".edit-button");
  if (target === null) {
    return;
  }

  const editableCard = target.closest(".card__editable[data-card-id]");
  const cardId = editableCard.getAttribute("data-card-id");
  const columnId = editableCard.getAttribute("data-column-id");

  // 수정된 데이터 가져오기
  const title = editableCard.querySelector(".card__title-input").value;
  const description = editableCard.querySelector(
    ".card__description-input"
  ).value;

  // 데이터 저장
  const todolist = getLocalStorage("todolist");
  const columnIndex = todolist.findIndex(
    (column) => column.id === Number(columnId)
  );
  const cards = todolist[columnIndex].cards;
  const cardIndex = cards.findIndex((card) => card.id === Number(cardId));
  const newCard = { ...cards[cardIndex], title, description };
  cards[cardIndex] = newCard;
  setLocalStorage("todolist", todolist);

  const card = document.querySelector(`.card[data-card-id="${cardId}"]`);

  editableCard.remove();
  card.style.display = "flex";
  card.querySelector(".card__title").innerHTML = title;
  card.querySelector(".card__description").innerHTML = description;
});
