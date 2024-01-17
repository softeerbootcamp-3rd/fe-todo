export default function Card() {
  // 300 120
  const card = document.createElement("div");
  card.className = "newCard";

  card.innerHTML = `
    <input class="title" type="text" placeholder="제목을 입력하세요." required></input>
    <input class="content" type="text" placeholder="내용을 입력하세요." required></input>
    <div class="btnbox">
        <button class="cancel">취소</button>
        <button class="register">등록</button>
    </div>
    `;
  return card;
}

export function handleRegisterStatus(column) {
  console.log(column);
  const cardElement = column.querySelector(".newCard");
  const titleInput = column.querySelector(".title");
  const contentInput = column.querySelector(".content");
  const cancelButton = column.querySelector(".cancel");
  const registerButton = column.querySelector(".register");

  registerButton.disabled = true;

  titleInput.addEventListener("input", () =>
    checkInputs(titleInput, contentInput, registerButton)
  );
  contentInput.addEventListener("input", () =>
    checkInputs(titleInput, contentInput, registerButton)
  );
  registerButton.addEventListener("click", () =>
    register(cardElement, titleInput, contentInput)
  );
  cancelButton.addEventListener("click", () => cardElement.remove());
}

function checkInputs(title, content, register) {
  let status = !(title.value.trim() && content.value.trim());
  register.disabled = status;
  register.style.opacity = status ? 0.3 : 1;
}

function register(card, title, content) {
  card.classList.remove("newCard");
  card.classList.add("registeredCard");

  const originalTitle = title.value;
  const originalContent = content.value;

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

  console.log(card);

  const editButton = card.querySelector("#edit");
  editButton.addEventListener("click", () =>
    editHandler(card, originalTitle, originalContent)
  );
}

function editHandler(card, title, content) {
  card.classList.remove("registeredCard");
  card.classList.add("newCard");
  card.innerHTML = `
    <input class="title" type="text" placeholder="제목을 입력하세요." value="${title}" required></input>
    <input class="content" type="text" placeholder="내용을 입력하세요." value="${content}" required></input>
    <div class="btnbox">
        <button class="cancel">취소</button>
        <button class="save">저장</button>
    </div>
  `;

  const cancelButton = card.querySelector(".cancel");
  cancelButton.addEventListener("click", () =>
    cancelHandler(card, title, content)
  );

  const saveButton = card.querySelector(".save");
  saveButton.addEventListener("click", () => saveHandler(card));
}

function cancelHandler(card, title, content) {
  card.classList.remove("newCard");
  card.classList.add("registeredCard");
  card.innerHTML = `
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

  // 이후의 동작 또는 이벤트 처리를 추가할 수 있습니다.
  console.log("cancel end");
  const editButton = card.querySelector("#edit");
  editButton.addEventListener("click", () => editHandler(card, title, content));

  return;
}

function saveHandler(card) {
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
  const editButton = card.querySelector("#edit");
  editButton.addEventListener("click", () =>
    editHandler(card, newTitle, newContent)
  );

  return;
}
