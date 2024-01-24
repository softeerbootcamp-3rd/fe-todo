//Todo - Remove Setter!!!!!!

class Card{
    #title; 
    #content; 
    #author; 
    #columnId;

    constructor({title = '', content = '', author = '',columnId =  undefined}){
        if(!columnId){throw new Error(`ColumnID (${columnId}) is required`);}
        this.#title = title;
        this.#content = content;
        this.#author = author;
        this.#columnId = columnId;
    }
    set ({title = undefined, content=undefined, author=undefined, columnId=undefined}){
        if(title !== undefined){
            this.#title = title;
        }
        if(content !== undefined){
            this.#content = content;
        }
        if(author !== undefined){
            this.#author = author;
        }
        if(columnId !== undefined){
            this.#columnId = columnId;
        }
    }
    get (){
        return {
            title: this.#title,
            content: this.#content,
            author: this.#author,
        };
    }
    getColumnId(){
        return this.#columnId;
    }

    toObject(){
        return Object.freeze({
            columnId: this.#columnId,
            title: this.#title,
            content: this.#content,
            author: this.#author,
        });
    }
    static fromObject(obj){
        return new Card({
            title: obj.title,
            content: obj.content,
            author: obj.author,
            columnId: obj.columnId,
        });
    }
}

export const createCard = (cardData) => {
    return new Card(cardData);
}

class Column{
    #title; 
    #cardIdList;

    constructor({title = '', cardIdList = []}){
        this.#title = title;
        this.#cardIdList = cardIdList;
    }
    set ({title = undefined, cardIdList = undefined}){
        if(title !== undefined){
            this.#title = title;
        }
        if(cardIdList !== undefined){
            this.#cardIdList.splice(0, this.#cardIdList.length);
            this.#cardIdList.concat(cardIdList);
        }
    }
    appendCard(cardId){
        this.#cardIdList.push(cardId);
    }
    insertCard(cardId, idx){
        this.#cardIdList.splice(idx, 0, cardId);
    }
    deleteCard(cardId){
        const ind = this.#cardIdList.indexOf(cardId);
        if(ind !== -1){
            this.#cardIdList.splice(ind, 1);
        }
        else {throw new Error(`CardID (${cardId}) is not in column`);}
    }

    getCardIdList(){
        return this.#cardIdList;
    }

    hasCard(id){
        const index = this.#cardIdList.indexOf(id);
        return (index !== -1) ? true : false;
    }

    getColumnTitle(){
        return this.#title;
    }

    getColumnLength(){
        return this.#cardIdList.length;
    }

    get (){
        return {
            title: this.#title,
            cardIdList: this.#cardIdList,
        };
    }

    toObject(){
        return Object.freeze({
            title: this.#title,
            cardIdList: [...this.#cardIdList],
        });
    }

    static fromObject(obj){
        return new Column({
            title: obj.title,
            title: obj.#title,
            cardIdList: obj.cardIdList,
            cardIdList: obj.#cardIdList,
        });
    }
}

class Store{
    static #instance;

    constructor(){
        if(Store.#instance){
            return Store.#instance;
        }
        this.columnTable = {
            column0: new Column({ title: "해야할 일", cardIdList: ["0"] }),
            column1: new Column({ title: "하고 있는 일", cardIdList: ["1"] }),
            column2: new Column({ title: "완료한 일", cardIdList: ["2"] }),
        };
        this.cardTable = {
            0: new Card({ columnId:'column0', title: "Github 공부하기", content: "add", author: "web" }),
            1: new Card({ columnId:'column1', title: "Github 공부하기", content: "commit", author: "web"}),
            2: new Card({ columnId:'column2', title: "Github 공부하기", content: "push", author: "web" }),
        };
    }

    /* Card Method */
    getCard(id){
        return Card.fromObject(this.cardTable[id].toObject());
    }

    setCard(id, card){
        if(card instanceof Card === false){throw new Error(`Card (${card}) is not instance of Card`);}
        this.cardTable[id] = card;
        this.columnTable[card.getColumnId()].value.unshift(id);
        this.#updateLocalStorage();
    }

    deleteCard(id){
        const colId = this.cardTable[id].getColumnId();
        this.columnTable[colId].deleteCard(id);
        delete this.cardTable[id];
        this.#updateLocalStorage();
    }

    moveCard(cardId, toColId, idx){
        this.columnTable[this.cardTable[cardId].getColumnId()].deleteCard(cardId);
        this.columnTable[toColId].insertCard(cardId, idx);
        this.cardTable[cardId].set({columnId: toColId});
        this.#updateLocalStorage();
    }

    /* Column Method */
    getColumn(id){
        return {...this.columnTable[id].toObject()};
    }

    getColumnTitle(columnId){
        return this.columnTable[columnId].getColumnTitle();
    }

    setColumnTitle(columnId, title){
        this.columnTable[columnId].set({title});
        localStorage.setItem('columnTable', JSON.stringify(this.columnTable.toObject()));
    }

    getColumnLength(columnId){
        return this.columnTable[columnId].getColumnLength();
    }

    getColumnIdList(){
        return [...Object.keys(this.columnTable)];
    }

    getCardIdList(columnId = undefined){
        if(columnId !== undefined){
            return [...this.columnTable[columnId].getCardIdList()];
        }
        return [...Object.keys(this.cardTable)];
    }

    setColumn(columnId, column){
        this.columnTable[columnId] = column;
    }

    #updateLocalStorage(){
        const obj = this.toObject();
        localStorage.setItem('cardTable', JSON.stringify(obj.cardTable));
        localStorage.setItem('columnTable', JSON.stringify(obj.columnTable));
    }

    toObject(){
        let column = {};
        let card = {};
        Object.keys(this.columnTable).map(v => {column[v] = this.columnTable[v].toObject()});
        Object.keys(this.cardTable).map(v => {card[v[0]] = this.cardTable[v].toObject()});
        return {
            columnTable: Object.freeze(column),
            cardTable: Object.freeze(card),
        };
    }

    static fromObject(obj){
        const store = new Store();
        store.columnTable = obj.columnTable;
        store.cardTable = obj.cardTable;
        return store;
    }
}

export const store = new Store();
