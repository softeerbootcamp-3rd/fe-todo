import { ButtonView } from "../view/components/ButtonView.js";
import { history } from "./history.js";

export class Column{
    #title; 
    #cardIdList;
    #cardList;
    #columnId;

    constructor({columnId = 'column'+Date.now(), title, cardIdList = [], cardList = new Map()}){
        this.#columnId = columnId;
        this.#cardList = cardList;
        this.#title = title;
        this.#cardIdList = cardIdList;
    }
    openAddForm()
    {
        const form = window[`${this.#columnId}-form`]
        if(form !== undefined) {form.remove(); return ;}
        const HTML = this.#renderFormTemplate();
        window[this.#columnId+'-list'].insertAdjacentHTML('afterbegin', HTML);
    }
    appendCard(card){
        //추가하고 카운트 변경!
        this.#cardList.set(card.get(), card);
        this.#cardIdList.unshift(card.get());
        card.add();
        this.renderLength();
        history.addHistory({...card.toObject(), type:'등록', from:this.#title});
    }

    insertCard(card, idx){
        this.#cardList.set(card.get(), card);
        this.#cardIdList.splice(idx, 0, card.get());
        card.render(idx);
        this.renderLength();
    }

    openEditForm(cardId){
        const card = this.#cardList.get(cardId);
        const index = this.#findCardIdx(cardId);
        if(card !== undefined){
            card.openForm(index);
            history.addHistory({...card.toObject(), type:'등록', from:this.#title});
        }
        else {throw new Error(`OpenEditForm Failed - CardID (${cardId}) is not in column (${this.#columnId})`);}
    }

    editCard(cardId, newCardData){
        const card = this.#cardList.get(cardId);
        if(card !== undefined){
            const index = this.#findCardIdx(cardId);
            if(card.edit(newCardData)){
                card.render(index);
                history.addHistory({...card.toObject(), type:'변경', from:this.#title});
            }
            else
                {throw new Error(`Edit Failed - Failed to edit CardID (${cardId}) in column (${this.#columnId})`);}   
        }
        else {throw new Error(`Edit Failed - CardID (${cardId}) is not in column (${this.#columnId})`);}
        
    }

    deleteCard(cardId){
        //지우고 카운트 변경!
        const card = this.#cardList.get(cardId);
        if(card !== undefined){
            card.delete();

            this.#cardIdList.splice(this.#findCardIdx(cardId), 1);
            this.#cardList.delete(cardId);
            this.renderLength();
            history.addHistory({...card.toObject(), type:'삭제', from:this.#title});
        }
        else {throw new Error(`Delete Failed - CardID (${cardId}) is not in column (${this.#columnId})`);}

    }

    moveCard(cardId, toColumnId){
        //옮기고 카운트 변경!
        //근데 인덱스만 바뀌면 한번만 호출하면 되나?
        const card = this.#cardList.get(cardId);
        
        

        if(card !== undefined){
            const index = this.#findCardIdx(cardId);
            this.#cardIdList.splice(index, 1);
            this.#cardList.delete(cardId);
            this.renderLength();
            history.addHistory({...card.toObject(), type:'이동', from:this.#title});
            return card.move(toColumnId);
        }
        else {throw new Error(`Move Failed - CardID (${cardId}) is not in column (${this.#columnId})`);}
    }

    #findCardIdx(cardId){
        return this.#cardIdList.findIndex(inlistId => inlistId === cardId);
    }

    set (){throw new Error(`Column is immutable`);}

    getTitle() {return this.#title;}

    //완전 변경 필요
    toObject(){
        return {
            title: this.#title,
            cardIdList: [...this.#cardIdList],
        };
    }

    //완전 변경 필요
    static fromObject(obj){
        return new Column({
            title: obj.title,
            cardIdList: obj.cardIdList,
        });
    }

    renderTitle(){
        window[`${this.#columnId}-title`].innerText = this.#title;
    }

    renderLength(){
        window[`${this.#columnId}-count`].innerText = this.#cardIdList.length;
    }

    render(index = 0){
        const listHTML = []
        this.#cardIdList.forEach((v, i) => listHTML.push(this.#cardList.get(v).render(o)));
        const HTML = this.#renderTemplate(listHTML);
        if(index !== 0)
            document.getElementById('main').children[index-1].insertAdjacentHTML('afterend', HTML);
        else
            document.getElementById('main').insertAdjacentHTML('afterbegin', HTML);
    }

    initRender(index = 0){
        //Todo - 렌더링 전에 서버에게 물어보자!!!
        const listHTML = []
        this.#cardIdList.forEach((v, i) => listHTML.push(this.#cardList.get(v).initRender()));
        const HTML = this.#renderTemplate(listHTML);
        if(index !== 0)
            document.getElementById('main').children[index-1].insertAdjacentHTML('afterend', HTML);
        else
            document.getElementById('main').insertAdjacentHTML('afterbegin', HTML);
        this.#cardList.forEach((v, i) => v.initRender(i));
    }

    #renderTemplate(listHTML){
        return `
        <section class="main__column" id="${this.#columnId}">
        <nav class="main__column__nav">
          <div class="column__nav__info">
            <h2 class="column__nav__info__title" id='${this.#columnId}-title'>${this.#title}</h2>
            <h6 class="column__nav__info__count" id='${this.#columnId}-count'>${this.#cardIdList.length}</h6>
          </div>
          <div class="column__nav__btn-list">
            <button class="js-addCardBtn column__nav__btn-list__add-card-btn"></button>
            <button class="js-deleteColumnBtn column__nav__btn-list__delete-cloumn-btn"></button>
          </div>
        </nav>
        <ul class="card-list" id="${this.#columnId}-list">
            ${listHTML.join('')}
        </ul>
      </section>    
        `;
    }

    #renderFormTemplate(){
        return `
        <form class="js-addForm card-form" id='${this.#columnId}-form'>
          <input placeholder="제목을 변경하세요" class="js-card-form__input card-form__title" name="title" type="text" required/>
          <textarea placeholder="내용을 입력하세요" class="js-card-form__input card-form__content" name="content" required></textarea>
          <div class="card-form__btn-list">
            ${ButtonView({
              color: "#6e7191",
              bgColor: "#f7f7fc",
              text: "취소",
              target: "addFormCancel",
            })}
            ${ButtonView({
              color: "#fefefe",
              bgColor: "#007aff",
              text: "등록",
              target: "addFormSubmit",
              type: "submit",
              disabled: "disabled",
            })}
          </div>
      </form>    
        `
    }
}