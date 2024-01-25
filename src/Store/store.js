import { getData } from "../services/http.js";

class Store {
    constructor(initialState = []) {
        this.state = initialState;
        this.events = [];
    }

    subscribe(eventCallback) {
        this.events.push(eventCallback);
    }

    notify() {
        this.events.forEach((eventCallback) => {
            eventCallback();
        });
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }

    addNewCard() {}
}

const getColumnData = await getData();
const store = new Store(getColumnData);

export default store;
