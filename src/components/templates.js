export function createColumnTemplate({ title, count }) {
    return `
    <header id = "columnHeader">
      <div class="columnInfo"> 
          <span class="columnTitle">${title}</span>
          <span class="countBox">${count}</span>
      </div>
      <span class="add" ><i id="add" class="fa-solid fa-plus"></i></span>
      <span id="delete"><i id="deleteCards" class="fa-solid fa-xmark"></i></span>
    </header>

  `;
}
export function createEditorTemplate(
    title = "",
    content = "",
    isEditMode = false
) {
    return `
    <input id="inputTitle" class="title" type="text" placeholder="제목을 입력하세요." value="${
        title || ""
    }" required></input>
    <input id ="inputContent" class="content" type="text" placeholder="내용을 입력하세요." value="${
        content || ""
    }" required></input>
    <div class="btnbox">
        <button id="cancelBtn" class="cancel">취소</button>
        <button id="${isEditMode ? "saveBtn" : "registerBtn"}" class="register"
  }">${isEditMode ? "저장" : "등록"}</button>
    </div>
  `;
}

export function createCardInfoTemplate(title, content) {
    return `
    <div class="cardInfo">
        <span class="registeredTitle"><strong>${title}</strong></span>
        <span class="registeredContent">${content}</span>
        <span style="font-size: 10px; margin-top: 10px"> author by Web </span> 
    </div>
    <div class="editor">
        <span id="delete"><i id="deleteBtn" class="fa-solid fa-xmark"></i></span>
        <span id="edit"><i id="editBtn" class="fa-solid fa-pen"></i></span>
    </div>
  `;
}

export function createModalTemplate() {
    return `
  <div class="modal-content">
    <p>선택한 카드를 취소할까요?</p>
    <div class="btnbox">
      <button id="cancelButton">취소</button>
      <button id="deleteButton">삭제</button>
    </div>
  </div>
  `;
}

export function createLogBoxTemplate() {
    return `
    <div class="logHeader">
      <span>사용자 활동 기록 </span>
      <button>X 닫기</button>
    </div>
    <div class="wrapper">
      <div class="logContent">
        <img src="src/img/Image.png" />
        <div>
          <span class="userName">@멋사</span>
          <span class="log">블로그에 포스팅할 것을(를) 하고있는 일에서 해야할 일으로
            이동하였습니다.</span>
          <span class="time">3분전</span>
        </div>
      </div>

      <div class="logContent">
        <img src="src/img/Image.png" />
        <div>
          <span class="userName">@멋사</span>
          <span class="log">블로그에 포스팅할 것을(를) 하고있는 일에서 해야할 일으로
            이동하였습니다.</span>
          <span class="time">3분전</span>
        </div>
      </div>
    </div>
    <footer>
      <button>전체기록 삭제</button>
    </footer>
  `;
}

export function logContent({ userName = "멋사", title, action, time }) {
    return `
      <div class="logContent">
        <img src="src/img/Image.png" />
        <div>
          <span class="userName">@${userName}</span>
          <span class="log">${title} ${action} 하였습니다.</span>
          <span class="time">${time}</span>
        </div>
      </div>
  `;
}
