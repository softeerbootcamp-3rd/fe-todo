import Card from "./src/components/cards.js";

function createCard() {
    const test2 = document.getElementById('todo');

    const test = Card();
    test2.appendChild(test);
}
createCard();