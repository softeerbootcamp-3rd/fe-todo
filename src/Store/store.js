import { getData } from "../services/http.js";
import { createUniqueId } from "../utils/createUniqueId.js";

class Store {
    constructor(initialState = []) {
        this.state = initialState;
        this.events = [];
    }

    subscribe(eventCallback) {
        this.events.push(eventCallback);
    }

    notify(payload) {
        if (!this.events) return;

        this.events.forEach((eventCallback) => {
            eventCallback(payload);
        });
    }

    getState() {
        return this.state;
    }

    setState() {}

    registeredCard({ columnIndex, title, content }) {
        const newCard = {
            id: createUniqueId(),
            title,
            content,
        };
        const newCardList = [newCard, ...this.state[columnIndex]["cardList"]];
        this.state[columnIndex]["count"] = newCardList.length;
        this.state[columnIndex]["cardList"] = newCardList;

        const columnId = this.state[columnIndex]["id"];
        const columnCnt = this.state[columnIndex]["count"];
        const payload = {
            columnId,
            newCardList,
            columnCnt,
        };
        console.log(payload);
        this.notify(payload);
    }

    deleteCard({ columnIndex, id }) {
        this.state[columnIndex]["cardList"] = this.state[columnIndex][
            "cardList"
        ].filter((element) => {
            element.id !== id;
        });
        this.notify(this.state[columnIndex]["cardList"]);
    }
}

const getColumnData = await getData();
const store = new Store(getColumnData);

export default store;
