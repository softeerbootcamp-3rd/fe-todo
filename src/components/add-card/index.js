import { setEvent } from "../../utils/set-event.js";
import * as Column from "../column/index.js";
import * as todos from "../../features/todos/index.js";

const app = document.getElementById("app");

export function template({ columnId }) {
  return `
    <li class="card__editable rounded-8 surface-default shadow-normal"
        style="display: none;"
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
            data-column-id=${columnId}
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
    `;
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
    select: (state) => {
      /** TODO: select only changed property for rendering optimally */
    },
    onChange: Column.render,
  });
});

setEvent(app, "click", (event) => {
  const target = event.target.closest(".cancel-button");
  if (target === null) {
    return;
  }

  const columnId = target.getAttribute("data-column-id");
});
