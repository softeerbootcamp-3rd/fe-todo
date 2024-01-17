// TODO: data 받기
export function template(data) {
  return `
    <li class="action-history__item">
        <img
          src="./assets/icons/avatar.png"
          class="rounded-1/2"
          style="width: 40px; height: 40px"
        />
        <div class="action-history__item-description">
          <p class="display-medium14 text-default">@멋진삼</p>
          <p class="display-medium14 text-default">
            <strong class="display-bold14 text-bold"
              >블로그에 포스팅할 것</strong
            >을(를)
            <strong class="display-bold14 text-bold">하고있는 일</strong
            >에서
            <strong class="display-bold14 text-bold">해야할 일</strong
            >으로
            <strong class="display-bold14 text-bold">이동</strong
            >하였습니다.
          </p>
          <span class="text-weak display-medium12">10분 전</span>
        </div>
    </li>
    `;
}
