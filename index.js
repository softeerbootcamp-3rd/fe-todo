import Card from "./src/components/cards.js";
import Column from "./src/components/columns.js";

function createCard(id) {
    const test2 = document.getElementById(id);

    const test = Card();
    test2.appendChild(test);
}

function createColumn(title, id) {
    const test = document.getElementById('app');
    const test2 = Column(title, id);

    test.appendChild(test2);
}
createColumn('해야할 일', 'todo');
createCard('todo');