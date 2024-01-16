export default function Card() {
  // 300 120
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <input class="title" type="text" placeholder="제목을 입력하세요."></input>
    <input class="content" type="text" placeholder="내용을 입력하세요."></input>
    <div class="btnbox">
        <button class="cancel">취소</button>
        <button class="register">등록</button>
    </div>
    `;
  return card;
}
