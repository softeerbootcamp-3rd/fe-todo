//Todo - Remove Setter!!!!!!

class Card{
    #title; 
    #content; 
    #author; 
    #columnId;

    constructor({title, content = '', author, columnId}){
        if(!columnId){throw new Error(`ColumnID (${columnId}) is required`);}
        this.#title = title;
        this.#content = content;
        this.#author = author;
        this.#columnId = columnId;
    }
    set (){throw new Error(`Card is immutable`);}
    get (){
        return {
            title: this.#title,
            content: this.#content,
            author: this.#author,
        };
    }
    getTitle(){
        return this.#title;
    }
    getContent(){
        return this.#content;
    }
    getAuthor(){
        return this.#author;
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
const remakeCard = (oldCard, newCardData) => {
    return new Card({...oldCard.toObject(), ...newCardData});
}

class Column{
    #title; 
    #cardIdList;

    constructor({title, cardIdList = []}){
        this.#title = title;
        this.#cardIdList = cardIdList;
    }
    appendCard(cardId){
        this.#cardIdList.push(cardId);
    }
    appendFrontCard(cardId){
        this.#cardIdList.unshift(cardId);
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

    set (){throw new Error(`Column is immutable`);}

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

export const createColumn = (columnData) => {
    return new Column(columnData);
}

const remakeColumn = (oldColumn, newColumnData) => {
    return new Column({...oldColumn.toObject(), ...newColumnData});
}


class History{
    #username;
    #cardTitle;
    #from;
    #to;
    #type;
    #time;
    constructor ({username, cardTitle, from=undefined, to=undefined, type, time}){
        this.#username = username;
        this.#cardTitle =cardTitle;
        this.#from = from;
        this.#to = to;
        this.#type = type;
        this.#time = time;
    }

    get(){
        return {
            username: this.username,
            cardTitle: this.cardTitle,
            from: this.from,
            to: this.to,
            type: this.type,
            time: this.time,
        };
    }

    get username(){return this.#username;}
    get cardTitle(){return this.#cardTitle;}
    get from(){return this.#from;}
    get to(){return this.#to;}
    get type(){return this.#type;}
    get time(){return this.#time;}


    set(){throw new Error(`History is immutable`);};

    toObject(){
        return Object.freeze({
            username: this.#username,
            cardTitle: this.#cardTitle,
            from: this.#from,
            to: this.#to,
            type: this.#type,
            time: this.#time,
        });
    }

    static fromObject(obj){
        return new History({
            username: obj.username,
            cardTitle: obj.cardTitle,
            from: obj.from,
            to: obj.to,
            type: obj.type,
            time: obj.time,
        });
    }
}

export const makeHistory = (hidtoryData) => {
    return new History(hidtoryData);
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
        this.historyList = [
            new History({username: "멋진삼", cardTitle: "블로그에 포스팅 할 것", from: "하고 있는 일", to: "해야할 일", type: "이동", time: "213"}),
        ];
        Store.#instance = this;
    }

    /* Card Method */

    getCard(id){
        return this.cardTable[id];
    }

    getCardTitle(id){
        return this.cardTable[id].getTitle();
    }

    getCardContent(id){
        return this.cardTable[id].getContent();
    }

    getCardAuthor(id){
        return this.cardTable[id].getAuthor();
    }

    getCardColumnId(id){
        return this.cardTable[id].getColumnId();
    }

    getCardData(id){
        return this.cardTable[id].toObject();
    }

    setCard(id, card){
        if(card instanceof Card === false){throw new Error(`Card (${card}) is not instance of Card`);}
        if(this.cardTable[id] !== undefined){throw new Error(`CardID (${id}) is already exist`);}
        this.cardTable[id] = card;
        this.columnTable[card.getColumnId()].appendFrontCard(id);
        this.#updateLocalStorage();
    }

    editCard(id, newCardData){
        const oldCardData = this.cardTable[id].toObject()
        this.deleteCard(id)
        this.setCard(id, new Card({ ...oldCardData, ...newCardData}));
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
        this.cardTable[cardId] = remakeCard(this.cardTable[cardId], {columnId: toColId});
        this.#updateLocalStorage();
    }

    /* Column Method */
    getColumn(columnId){
        return this.columnTable[columnId];
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

    shuffleColumn(columnId, column){
        const oldColumn = this.columnTable[columnId];
        if(oldColumn.getColumnLength() !== column.length 
            || !oldColumn.getCardIdList().every((v) => column.includes(v)))
        {
            throw new Error(`Column (${columnId}) has lost some cards`);
        }
        const newColumn = new Column({title: oldColumn.getColumnTitle(), cardIdList: column});
        this.columnTable[columnId] = newColumn;
        this.#updateLocalStorage();
    }

    /* History Method */
    setHistory(history){
        this.historyList.unshift(history);
    }

    getHistoryList(){
        return [...this.historyList];
    }

    getHistoryLength(){
        return this.historyList.length;
    }

    purgeHistory(){
        this.historyList.splice(0, this.historyList.length);
    }

    /* LocalStorage Method */
    #updateLocalStorage(){
        const obj = this.toObject();
        localStorage.setItem('cardTable', JSON.stringify(obj.cardTable));
        localStorage.setItem('columnTable', JSON.stringify(obj.columnTable));
    }

    toObject(){
        let column = {};
        let card = {};
        Object.keys(this.columnTable).forEach(v => {column[v] = this.columnTable[v].toObject()});
        Object.keys(this.cardTable).forEach(v => {card[v[0]] = this.cardTable[v].toObject()});
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
