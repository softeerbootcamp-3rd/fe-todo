import todoStore from "../../store/todoStore.js";

export function template({ columnId }) {
  return /*html*/ `
    <li class="card__editable rounded-8 surface-default shadow-normal"
        style="display: none;"
        data-column-id=${columnId}
    >
      <div class="card__contents" data-column-id=${columnId}>
          <textarea
            class="card__title-input display-bold14 text-strong"
            placeholder="제목을 입력하세요"
            rows="1">
          </textarea>
          <textarea
            class="card__description-input display-medium14 text-default"
            placeholder="내용을 입력하세요"
            rows="1">
          </textarea>
      </div>
      <div class="card__editable-buttons">
        <button 
            data-column-id=${columnId}
            class="add-cancel-button button rounded-8 surface-alt display-bold14 text-default"
            type="button"
        >
          취소
        </button>
        <button 
            data-column-id=${columnId}
            class="add-button button rounded-8 surface-brand display-bold14 text-white-default"
            disabled
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

  // TODO: author를 user agent에서 추출하기
  const columnId = target.getAttribute("data-column-id");
  const cardContent = document.querySelector(
    `.card__contents[data-column-id="${columnId}"]`
  );
  const title = cardContent.querySelector(".card__title-input").value;
  const description = cardContent.querySelector(
    ".card__description-input"
  ).value;

  const data = { id: new Date().getTime(), title, description, author: "web" };

  todoStore.dispatch({
    type: "ADD_TODO",
    parameter: [columnId],
    payload: {
      columnId: columnId,
      newCard: data,
    },
  });
});

// 카드 등록 취소
document.querySelector("#app").addEventListener("click", (event) => {
  const target = event.target.closest(".add-cancel-button");
  if (target === null) {
    return;
  }

  const columnId = target.getAttribute("data-column-id");
  const addCard = document.querySelector(
    `.card__editable[data-column-id="${columnId}"]`
  );
  addCard.style.display = "none";
  addCard.setAttribute("editable", "false");
});

// 글자 수 확인 (버튼 활성화)
document.querySelector("#app").addEventListener("input", (event) => {
  const target = event.target.closest(".card__editable");
  if (target === null) {
    return;
  }

  // 추가 버튼 혹은 수정 버튼
  let button = target.querySelector(".add-button");
  if (!button) {
    button = target.querySelector(".edit-button");
  }

  // 입력 중인 글자 가져오기
  const cardContent = target.querySelector(".card__contents");
  const title = cardContent.querySelector(".card__title-input").value;
  const description = cardContent.querySelector(
    ".card__description-input"
  ).value;

  // 글자 수 확인
  if (title.length === 0 || description.length === 0) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
});
