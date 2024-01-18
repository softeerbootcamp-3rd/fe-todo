export function template(data) {
  return `
    <li class="card__editable rounded-8 surface-default shadow-normal"
    >
    <div class="card__contents">
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
        class="button rounded-8 surface-alt display-bold14 text-default"
        type="button"
        >
        취소
        </button>
        <button
        class="button rounded-8 surface-brand display-bold14 text-white-default"
        type="button"
        >
        등록
        </button>
    </div>
    </li>
    `;
}
