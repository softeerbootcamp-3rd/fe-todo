import { setEvent } from "../../utils/set-event.js";
import * as Column from "../column/index.js";
import * as todos from "../../features/todos/index.js";

const app = document.getElementById("app");

export function template({ columnId }) {
  return `
  <dialog  class="card__editable-dialog" data-column-id=${columnId}>
    <li class="card__editable rounded-8 surface-default shadow-normal"
        data-column-id=${columnId}
    >
      <div class="card__contents" data-column-id=${columnId}>
        <input
            class="card__title-input display-bold14 text-strong"
            type="text"
            placeholder="제목을 입력하세요"
        />
        <input
            class="card__description-input display-medium14 text-default"
            type="text"
            placeholder="내용을 입력하세요"
        />
      </div>
      <div class="card__editable-buttons">
        <button 
            class="cancel-button button rounded-8 surface-alt display-bold14 text-default"
            type="button"
        >
          취소
        </button>
        <button 
            data-column-id=${columnId}
            class="add-button button rounded-8 surface-brand display-bold14 text-white-default"
            type="button"
        >
          등록
        </button>
      </div>
    </li>
  </dialog>
    `;
}

export function toggle({ columnId }) {
  const addCardDialog = document.querySelector(
    `.card__editable-dialog[data-column-id="${columnId}"]`
  );
  addCardDialog.querySelector(".card__title-input").value = "";
  addCardDialog.querySelector(".card__description-input").value = "";
  const isOpen = addCardDialog.getAttribute("open") === "";
  isOpen ? addCardDialog.close() : addCardDialog.show();
}

// 카드 등록
setEvent(app, "click", async (event) => {
  const addCardButton = event.target.closest(".add-button");
  if (!addCardButton) return;

  const columnId = addCardButton.getAttribute("data-column-id");
  const cardContent = document.querySelector(
    `.card__contents[data-column-id="${columnId}"]`
  );
  const title = cardContent.querySelector(".card__title-input").value;
  const description = cardContent.querySelector(
    ".card__description-input"
  ).value;

  await todos.addCard({
    // TODO: parse `navigator.agent` and then assign it to author
    data: { columnId, title, description, author: "web" },
    onChange: (state) => {
      Column.render({
        column: state.todos.find((column) => column.id === columnId),
      });
    },
  });
});

setEvent(app, "click", (event) => {
  const cancelButton = event.target.closest(".cancel-button");
  if (!cancelButton) return;

  const dialog = cancelButton.closest(".card__editable-dialog");
  dialog.close();
});
