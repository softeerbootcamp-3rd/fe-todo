export function template({ history }) {
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
            ${historyDescriptionTemplate({ history })}
          </p>
          <span class="text-weak display-medium12">10분 전</span>
        </div>
    </li>
    `;
}

function historyDescriptionTemplate({ history }) {
  switch (history.action) {
    case "ADD":
      return addTemplate(history);
    case "EDIT":
      return editTemplate(history);
    case "DELETE":
      return deleteTemplate(history);
    case "MOVE":
      return moveTemplate(history);
  }
}

function addTemplate(history) {
  const { cardTitle, currentColumn } = history;
  return `<strong class="display-bold14 text-bold">${cardTitle}</strong>을(를)
          <strong class="display-bold14 text-bold">${currentColumn}</strong>에서
          <strong class="display-bold14 text-bold">등록</strong>하였습니다.`;
}

function editTemplate(history) {
  const { cardTitle } = history;
  return `<strong class="display-bold14 text-bold">${cardTitle}</strong>을(를)
  <strong class="display-bold14 text-bold">변경</strong>하였습니다.`;
}

function deleteTemplate(history) {
  const { cardTitle } = history;
  return `<strong class="display-bold14 text-bold">${cardTitle}</strong>을(를)
  <strong class="display-bold14 text-bold">삭제</strong>하였습니다.`;
}

function moveTemplate(history) {
  const { cardTitle, previousColumn, currentColumn } = history;
  return `<strong class="display-bold14 text-bold">${cardTitle}</strong>을(를)
          <strong class="display-bold14 text-bold">${previousColumn}</strong>에서
          <strong class="display-bold14 text-bold">${currentColumn}</strong>(으)로
          <strong class="display-bold14 text-bold">이동</strong>하였습니다.`;
}
