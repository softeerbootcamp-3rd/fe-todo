import { Column } from './column.js';
import { Card } from './card.js';

class Store{
    static #instance;

    constructor(columnTable = {}){
        if(Store.#instance){
            return Store.#instance;
        }
        if(localStorage.getItem('cardTable') !== null){
            const columnTableObj = JSON.parse(localStorage.getItem('columnTable'));
            this.columnTable = {};
            Object.keys(cardTableObj).forEach(v => {this.cardTable[v] = Card.fromObject(cardTableObj[v])});
            Object.keys(columnTableObj).forEach(v => {this.columnTable[v] = Column.fromObject(columnTableObj[v])});
            this.historyList = [];
            Store.#instance = this;
            return this;
        }
        this.columnTable = {
            column0: new Column({ 
                title: "해야할 일", 
                cardIdList: ["card0"], 
                cardList: new Map([["card0", new Card({ cardId: "card0", columnId:'column0', title: "Github 공부하기", content: "add", author: "web" })]]),
                columnId: "column0"}),
            column1: new Column({ 
                title: "하고 있는 일", 
                cardIdList: ["card1"], 
                cardList: new Map([["card1", new Card({ cardId: "card1", columnId:'column1', title: "Github 공부하기", content: "commit", author: "web"})]]),
                columnId: "column1"}),
            column2: new Column({ 
                title: "완료한 일", 
                cardIdList: ["card2"], 
                cardList: new Map([["card2", new Card({ cardId: "card2", columnId:'column2', title: "Github 공부하기", content: "push", author: "web" })]]),
                columnId : "column2"}),
        };
        Store.#instance = this;
        return this;
    }

    /* Card Method */
    setCard({cardId, title, content, author, columnId}){
        const card = new Card({cardId, title, content, author, columnId});
        if(card === false) return false;
        const res = this.columnTable[columnId].appendCard(card);

        if(res){

        }
        return true;
    }

    editCard({cardId, columnId, newCardData}){
        const res = this.columnTable[columnId].editCard(cardId, newCardData);
        if(res){

        }
    }

    deleteCard({cardId, columnId}){
        const res = this.columnTable[columnId].deleteCard(cardId);
        if(res){

        }
    }

    moveCard({cardId, fromColumnId, toColumnId, index}){
        const card = this.columnTable[fromColumnId].moveCard(cardId, toColumnId);
        this.columnTable[toColumnId].insertCard(card, index);
        const cardData = card.toObject();
    }

    openAddForm(columnId){
        this.columnTable[columnId].openAddForm();
    }

    openEditForm(cardId, columnId){
        this.columnTable[columnId].openEditForm(cardId);
    }

    closeEditForm(cardId, columnId){
        this.columnTable[columnId].closeEditForm(cardId);
    }

    /* LocalStorage Method */
    #updateLocalStorage(){
        //ToDo - 각 카드로 쪼개어 저장하기 -> 여기 말고 Card로 가야함!
        const obj = this.toObject();
        localStorage.setItem('cardTable', JSON.stringify(obj.cardTable));
        localStorage.setItem('columnTable', JSON.stringify(obj.columnTable));
    }

    addHistory({username, cardTitle, from = undefined, to = undefined, type}){
        const newhistory = {
            username,
            cardTitle,
            from,
            to,
            type,
            time: Date.now(),
        }
    }

    toObject(){
        let column = {};
        Object.entries(this.columnTable).forEach((v) => {column[v[0]] = v[1].toObject()});
        return {
            columnTable: column,
        };
    }

    static fromObject(obj){
        let column = Column.fromObject(obj.columnTable);
        const store = new Store(column);
        this.#instance = store;
        return store;
    }

    static fromServer(){
        /*
            서버에서 Object로 받아와 Card instance로 반환 -> (get /api/store)
            columnTable을 해독하여 columnKey 찾기
            찾은 ColumnKey를 이용해 Column instance 생성 (static method Column.fromServer(columnId))
            Column instance를 받아 Store 구성
        */
       
    }

    initRender(){
        const HTML = 
        `
        <header class="header">
            <h1 class="header__title">TODO LIST</h1>
            <button class="js-openHistory header__history-btn">
            </button>
        </header>
        <main id='main' class="main">
        </main>
        `
        app.insertAdjacentHTML('beforeend', HTML);
        Object.values(this.columnTable).map((v, i) => v.initRender(i));
    }
}

export const store = new Store();