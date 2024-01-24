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
    set ({title = undefined, content=undefined, author=undefined}){
        if(title !== undefined){
            this.#title = title;
        }
        if(content !== undefined){
            this.#content = content;
        }
        if(author !== undefined){
            this.#author = author;
        }
    }
    get (){
        return {
            title: this.#title,
            content: this.#content,
            author: this.#author,
        };
    }
    get columnId(){
        return this.#columnId;
    }

    toObject(){
        return {
            columnId: this.#columnId,
            title: this.#title,
            content: this.#content,
            author: this.#author,
        }
    }
    static fromObject(obj){
        return new Card({
            title: obj.title,
            content: obj.content,
            author: obj.author,
            id: obj.id,
            columnId: obj.columnId,
        });
    }
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
        if(ind !== -1){this.#cardIdList.splice(this.#cardIdList.indexOf(cardId), 1);}
    }

    get cardIdList(){
        return this.#cardIdList;
    }

    get (){
        return {
            title: this.#title,
            cardIdList: this.#cardIdList,
        };
    }

    toObject(){
        return {
            title: this.#title,
            cardIdList: this.#cardIdList,
        };
    }

    static fromObject(obj){
        return new Column({
            title: obj.title,
            cardIdList: obj.cardIdList,
            columnId: obj.columnId,
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
            column0: Object.freeze(new Column({ title: "해야할 일", value: ["0"] })),
            column1: Object.freeze(new Column({ title: "하고 있는 일", value: ["1"] })),
            column2: Object.freeze(new Column({ title: "완료한 일", value: ["2"] })),
        };
        this.cardTable = {
            0: Object.freeze(new Card({ columnId:'column0', title: "Github 공부하기", content: "add", author: "web" })),
            1: Object.freeze(new Card({ columnId:'column1', title: "Github 공부하기", content: "commit", author: "web" })),
            2: Object.freeze(new Card({ columnId:'column2', title: "Github 공부하기", content: "push", author: "web" })),
        };
    }

    getCard(id){
        return this.cardTable[id];
    }

    setCard(id, card){
        if(card instanceof Card === false){throw new Error(`Card (${card}) is not instance of Card`);}
        this.cardTable[id] = Object.freeze(card);
        this.columnTable[card.getColumn()].value.push(id);
        localStorage.setItem('cardTable', JSON.stringify(this.cardTable));
        localStorage.setItem('columnTable', JSON.stringify(this.columnTable.toObject()));
    }

    deleteCard(id){
        colId = this.cardTable[id].columnId;
        this.columnTable[colId].deleteCard(id);
        delete this.cardTable[id];
        localStorage.setItem('cardTable', JSON.stringify(this.cardTable.toObject()));
        localStorage.setItem('columnTable', JSON.stringify(this.columnTable.toObject()));
    }

    getColumn(id){
        return this.columnTable[id];
    }

    setColumn(id, column){
        this.columnTable[id] = column;
    }

    toObject(){
        return {
            columnTable: this.columnTable,
            cardTable: this.cardTable,
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
