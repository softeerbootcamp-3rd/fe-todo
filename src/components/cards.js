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

export function handleRegisterStatus() {
  const titleInput = document.querySelector(".title");
  const contentInput = document.querySelector(".content");
  const registerButton = document.querySelector(".register");
  const cardElement = document.querySelector(".card");

  // 등록 버튼을 초기에 비활성화합니다.
  registerButton.disabled = true;

  // 입력값이 변경될 때마다 이벤트를 처리하는 함수를 등록합니다.
  titleInput.addEventListener("input", () =>
    checkInputs(titleInput, contentInput, registerButton)
  );
  contentInput.addEventListener("input", () =>
    checkInputs(titleInput, contentInput, registerButton)
  );
  registerButton.addEventListener("click", () =>
    register(cardElement, titleInput, contentInput)
  );
}

function checkInputs(title, content, register) {
  // 입력값이 비어있지 않으면 등록 버튼을 활성화하고, 비어있으면 비활성화합니다.
  register.disabled = !(title.value.trim() && content.value.trim());
}

// 등록 버튼을 클릭했을 때 호출되는 함수
function register(card, title, content) {
  // 실제로 등록하는 로직을 여기에 추가할 수 있습니다.
  console.log(card);
  card.classList.remove("newCard");
  card.classList.add("registeredCard");
  card.innerHTML = `
    <div class="cardInfo">
        <span class="title">${title.value}</span>
        <span class="content">${content.value}</span>
        <span style="font-size: 10px; margin-top: 10px"> author by Web </span> 
    </div>
    <div class="editor">
        <span id="delete"><i class="fa-solid fa-xmark"></i></span>
        <span><i class="fa-solid fa-pen"></i></span>
    </div>
  `;
}

// document.addEventListener("DOMContentLoaded", handleRegisterStatus);
