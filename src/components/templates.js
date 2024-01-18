export function createColumnTemplate(title, id, count) {
  return `  
  <header id = "columnHeader">
    <div class="columnInfo"> 
        <span>${title}</span>
        <span class="countBox">${count}</span>
    </div>
    <span id="add" class="add" ><i class="fa-solid fa-plus"></i></span>
    <span id="delete"><i class="fa-solid fa-xmark"></i></span>
  </header>
  `;
}
export function createEditorTemplate(
  title = "",
  content = "",
  isEditMode = false
) {
  return `
    <input class="title" type="text" placeholder="제목을 입력하세요." value="${
      title || ""
    }" required></input>
    <input class="content" type="text" placeholder="내용을 입력하세요." value="${
      content || ""
    }" required></input>
    <div class="btnbox">
        <button class="cancel">취소</button>
        <button class="${isEditMode ? "save" : "register"}">${
    isEditMode ? "저장" : "등록"
  }</button>
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
        <span id="delete"><i class="fa-solid fa-xmark"></i></span>
        <span id="edit"><i class="fa-solid fa-pen"></i></span>
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
