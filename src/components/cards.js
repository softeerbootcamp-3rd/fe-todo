export default function Card() {
    // 300 120
    const card = document.createElement('div');
    card.innerHTML = `
    <input type="text" placeholder="제목을 입력하세요."></input>
    <input type="text" placeholder="내용을 입력하세요."></input>
    <button>취소</button>
    <button>등록</button>
    `;
    return card;
}