export function createColumnTemplate(title, id, count) {
  return `  
  <header id="columnHeader">
    <div class="columnInfo"> 
        <span>${title}</span>
        <span class="countBox">${count}</span>
    </div>
    <span class="add" ><i id="add" class="fa-solid fa-plus"></i></span>
    <span id="delete"><i id="deleteCards" class="fa-solid fa-xmark"></i></span>
  </header>
  <section id="cardList-${id}">
  </section>
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
        <span class="registeredTitle">${title}</span>
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
  const log = document.createElement("section");
  log.className = "logBox";

  log.innerHTML = `
    <header>
      사용자 활동 기록
      <button>x 닫기</button>
    </header>
    <div>
      <div>
        <img />
        <p>
          <span>@멋진종호</span>
          <span
            >블로그에 포스팅할 것을(를) 하고있는 일에서 해야할 일으로
            이동하였습니다.</span
          >
        </p>
      </div>

      <div>
        <img />
        <p>
          <span>@멋진민우</span>
          <span>Github 공부하기을(를) 변경하였습니다.</span>
        </p>
      </div>
    </div>
    <footer>
      <button></button>
    </footer>
  `;
  document.getElementById("app").appendChild(log);
}
