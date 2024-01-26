import { ButtonView } from "../view/components/ButtonView.js";
import * as Server from "../util/getFromServer.js";
import { history } from "./history.js";

/*
처리 순서
    1. 메소드 실행
    2. 서버 질의
    3. 서버 응답
    (응답이 OK가 아니면 2번으로)
    4. 히스토리 등록
    5. 뷰 갱신
*/

export class Card{
    #title; 
    #content; 
    #author; 
    #columnId;
    #cardId;

    constructor({cardId='card'+Date.now(), title, content = '', author='', columnId}){
        if(!columnId){throw new Error(`ColumnID (${columnId}) is required`);}
        if(!this.#checkInput({title, content})) return false;
        this.#cardId = cardId;
        this.#title = title;
        this.#content = content;
        this.#author = author;
        this.#columnId = columnId;
    }

    get (){return this.#cardId;}

    add(){
        Server.setCardToServer(this.toObject());
        this.render(0);
    }

    move(newColumnId){
        //Todo - 이전 column에서 뷰를 지워야 함.
        //전역 property를 만들어 더티체킹을 하고 트리거 되는 순간 리스너를 통해 render를 돌리는게 좋을지도...
        //아니면 column에서 생성 당시에 넣어주거나...
        //빼기 전 뷰 지우기 + 넣으며 뷰 그리기
        //근데 빼기 전에 서버에 물어봤나요?
        Server.moveCardToServer({...this.toObject(), to:newColumnId});
        window[this.#cardId].remove();
        this.#columnId = newColumnId;
        return this;
    }

    getColumnId(){return this.#columnId;}

    edit({title = undefined, content = undefined, author = undefined}){
        //확인과정 
        if(!this.#checkInput({title, content})) return false;        
        //바꾸기 전에 서버에 물어보고 바꾸기!
        Server.editCardToServer({...this.toObject(), title, content, author});
        history.addHistory({...this.toObject(), type:'변경', from:this.#title});
        title && (this.#title = title);
        content && (this.#content = content);
        author && (this.#author = author);
        document.getElementById(`${this.#cardId}-form`).remove();
        return true;
    }

    delete(){
        //확인 끝났으면 서버에 물어보고 지우기!
        Server.deleteCardFromServer(this.toObject());
        window[this.#cardId].remove();
    }

    
    toObject(){
        return {
            cardId: this.#cardId,
            columnId: this.#columnId,
            title: this.#title,
            content: this.#content,
            author: this.#author,
        };
    }


    static fromObject(obj){
        return new Card({
            cardId: obj.cardId,
            title: obj.title,
            content: obj.content,
            author: obj.author,
            columnId: obj.columnId,
        });
    }

    static async fromServer(cardId){
        /*
            cardId를 통해 card를 요청 -> (get /api/card/cardId)
            받은 카드 데이터로 Card instance 생성 후 반환
        */
        const newCard = await fetch(`/api/card/${cardId}`).then(res => {
              if(res.ok){
                return res.json();
              }
              else{
                throw new Error(`Card ${cardId} is not exist`);
              }
        }).then(data => { 
            return Card.fromObject(data);
        }).catch(err => {
                console.log(err);
        });

        return newCard;
    }

    #checkInput({title, content}){
        if(title === '' || content === '' || content.length > 500){return false;}
        else return true;
    }

    openForm(index = 0){
        const form = window[`${this.#cardId}-form`]
        if(form !== undefined) {form.remove(); this.render(index); return ;}
        window[`${this.#cardId}`].remove();
        const HTML = this.#renderFormTemplate();
        if(index !== 0)
            document.getElementById(`${this.#columnId}-list`).children[index-1].insertAdjacentHTML('afterend', HTML);
        else
            document.getElementById(`${this.#columnId}-list`).insertAdjacentHTML('afterbegin', HTML);
    }

    closeForm(index = 0){
        const form = window[`${this.#cardId}-form`]
        if(form === undefined) {this.render(index); return ;}
        form.remove();
        this.render(index);
    }

    render(index = 0){
        const HTML = this.#renderTemplate();
        if(index !== 0)
            document.getElementById(`${this.#columnId}-list`).children[index-1].insertAdjacentHTML('afterend', HTML);
        else
            document.getElementById(`${this.#columnId}-list`).insertAdjacentHTML('afterbegin', HTML);
    }

    initRender(){
        //Todo - 렌더링 전에 서버에게 물어보자!!!
        const HTML = this.#renderTemplate();
        return HTML;
    }

    #renderTemplate(){
        return `
        <li class="card" id="${this.#cardId}" draggable="true">
        <h3 class="card__title">${this.#title}</h3>
        <p class="card__content">${this.#content}</p>
        <p class="card__author">author by ${this.#author}</p>
        <div class="card__btn-list">
          <button class="js-deleteCardBtn card__btn-list__delete-card-btn"></button>
          <button class="js-editCardBtn card__btn-list__edit-card-btn"></button>
        </div>
      </li>   
        `;
    }

    #renderFormTemplate(){
        return `
        <form class="js-editForm card-form--edit" id='${this.#cardId}-form'>
          <input placeholder="제목을 변경하세요" class="card-form__title" name="title" type="text" value='${this.#title}'required/>
          <textarea placeholder="내용을 입력하세요" class="card-form__content" name="content" required>${this.#content}</textarea>
          <div class="card-form__btn-list">
            ${ButtonView({
              color: "#6e7191",
              bgColor: "#f7f7fc",
              text: "취소",
              target: "editFormCancel",
            })}
            ${ButtonView({
              color: "#fefefe",
              bgColor: "#007aff",
              text: "저장",
              target: "editFormSubmit",
              type: "submit",
            })}
          </div>
      </form>    
        `;
    }
}