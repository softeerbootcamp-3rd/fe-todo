import * as Column from "../column/index.js";

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
document.querySelector("#app").addEventListener("click", (event) => {
  const target = event.target.closest(".add-button");
  if (target === null) {
    return;
  }

  const columnId = target.getAttribute("data-column-id");
  const cardContent = document.querySelector(
    `.card__contents[data-column-id="${columnId}"]`
  );
  const title = cardContent.querySelector(".card__title-input").value;
  const description = cardContent.querySelector(
    ".card__description-input"
  ).value;

  // TODO: author를 user agent에서 추출하기
  const data = { id: new Date().getTime(), title, description, author: "web" };

  const todolist = JSON.parse(localStorage.getItem("todolist"));
  const selectedColumnIndex = todolist.findIndex(
    (item) => item.id === Number(columnId)
  );
  todolist[selectedColumnIndex].cards = [
    data,
    ...todolist[selectedColumnIndex].cards,
  ];

  localStorage.setItem("todolist", JSON.stringify(todolist));

  // NOTE: 특정 칼럼에 대한 카드 리렌더링
  const column = document.querySelector(
    `.column[data-column-id="${columnId}"]`
  );
  column.innerHTML = `${Column.template({
    column: JSON.parse(localStorage.getItem("todolist"))[selectedColumnIndex],
  })}`;
});

document.querySelector("#app").addEventListener("click", (event) => {
  const target = event.target.closest(".cancel-button");
  if (target === null) {
    return;
  }

  const columnId = target.getAttribute("data-column-id");
});
