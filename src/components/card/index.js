export function template(data) {
  return `
  <li class="card rounded-8 surface-default shadow-normal">
  <div class="card__contents">
      <h3 class="card__title text-strong display-bold14">
      GitHub 공부하기
      </h3>
      <p class="card__description text-default display-medium14">
      add, commit, push
      </p>
      <span class="card__author text-weak display-medium12"
      >author by jj</span
      >
  </div>
  <div class="card__buttons">
      <button type="button">
      <img src="./assets/icons/close.svg" />
      </button>
      <button type="button">
      <img src="./assets/icons/edit.svg" />
      </button>
  </div>
  </li>
    `;
}
