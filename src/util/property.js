class Property {
    #value;
    #listeners = [];
    constructor(value){
        this.#value = value;
    }

    get value(){
        return this.#value;
    }

    set value(value){
        this.#value = value;
    }

    addListener(listener){
        this.#listeners.push(listener);
    }

    notify(){
        this.#listeners.forEach(listener => listener(this.#value));
    }

    removeListener(listener){
        this.#listeners = this.#listeners.filter(l => l !== listener);
    }

    getListeners(){
        return this.#listeners;
    }

    toString(){
        return this.#value.toString();
    }

    valueOf(){
        return this.#value.valueOf();
    }

    toJSON(){
        return this.#value.toJSON();
    }
}