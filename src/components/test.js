function editHandler() {
  card.classList.remove("registeredCard");
  card.classList.add("newCard");
  card.innerHTML = `
    <input class="title" type="text" placeholder="제목을 입력하세요." value="${originalTitle}" required></input>
    <input class="content" type="text" placeholder="내용을 입력하세요." value="${originalContent}" required></input>
    <div class="btnbox">
        <button class="cancel">취소</button>
        <button class="save">저장</button>
    </div>
  `;

  const cancelButton = card.querySelector(".cancel");
  cancelButton.addEventListener("click", cancelHandler);

  const saveButton = card.querySelector(".save");
  saveButton.addEventListener("click", saveHandler);
}

function cancelHandler() {
  card.classList.remove("newCard");
  card.classList.add("registeredCard");
  card.innerHTML = `
    <div class="cardInfo">
        <span class="registeredTitle">${originalTitle}</span>
        <span class="registeredContent">${originalContent}</span>
        <span style="font-size: 10px; margin-top: 10px"> author by Web </span> 
    </div>
    <div class="editor">
        <span id="delete"><i class="fa-solid fa-xmark"></i></span>
        <span id="edit"><i class="fa-solid fa-pen"></i></span>
    </div>
  `;

  // 이후의 동작 또는 이벤트 처리를 추가할 수 있습니다.
  console.log("cancel end");
}

function saveHandler() {
  const newTitle = card.querySelector(".title").value;
  const newContent = card.querySelector(".content").value;

  card.classList.remove("newCard");
  card.classList.add("registeredCard");

  card.innerHTML = `
    <div class="cardInfo">
        <span class="registeredTitle">${newTitle}</span>
        <span class="registeredContent">${newContent}</span>
        <span style="font-size: 10px; margin-top: 10px"> author by Web </span> 
    </div>
    <div class="editor">
        <span id="delete"><i class="fa-solid fa-xmark"></i></span>
        <span id="edit"><i class="fa-solid fa-pen"></i></span>
    </div>
  `;
  // 이후의 동작 또는 이벤트 처리를 추가할 수 있습니다.
  console.log("save end");
}
