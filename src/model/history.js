import { getElapsedTime } from "../util/getElapsedTime";

class History{
    #historyList;
    #isShowing;
    constructor ({historyList = []}){
        this.#historyList = historyList;
        this.#isShowing = false;
    }

    #historyType = ['이동', '삭제', '변경', '등록'];



    #makeHistory({author, title, type, from = '', to = ''}){
        if(this.#historyType.filter(v => v === type).length === 0) 
            throw new Error(`History Error - type is not valid (${type})`);
        if(type === '이동' && !from && !to )
            throw new Error(`History Error - '이동' must have 'from(${from})' and 'to(${to})'`);
        if(type === '등록' && !from)
            throw new Error(`History Error - '등록' must have appended column as 'from(${from})'`);
        const newHistory = {
            username: author,
            time: new Date(),
            cardTitle: title,
            type: type,
            from: from,
            to: to,
          };

          return newHistory;
    }

    addHistory({author, title, type, from = '', to = ''}){
        const newHistory = this.#makeHistory({author, title, type, from, to})
        this.#historyList.push(newHistory);
        const HTML = this.#historyListRender();
        document.getElementById('history-list').remove();
        document.getElementById('history-header').insertAdjacentHTML('afterend', HTML);
    }

    purge(){
        this.#historyList = [];
        document.getElementById('history-list').remove();
        document.getElementById('history-header').insertAdjacentHTML('afterend', this.#historyListRender());
    }

    show(){
      if(this.#isShowing === true) {
          this.hide();
            return;
        }
        const HTML = this.#historyListRender()
        document.getElementById('history-list').remove();
        document.getElementById('history-header').insertAdjacentHTML('afterend', HTML);
        document.getElementById('history').style.transform = 'translateX(calc(0px))';
        document.getElementById('history').style.transition = 'all ease 1s';
        this.#isShowing = true;
    }

    hide(){
        document.getElementById('history').style.transform = 'translateX(calc(+422px))';
        document.getElementById('history').style.transition = 'all ease 1s';
        this.#isShowing = false;
    }

    initRender(){
        const HTML = `
        <div class="js-closeHistory history" id='history'>
        <div class="history__wrapper">
        <header class="history__header" id='history-header'>
          <h3 class="history__header__title">사용자 활동 기록</h3>
          <button class="js-closeHistory history__header__close">
            <img class="js-closeHistory" src="/assets/close.svg" alt="close" />
            <p class="js-closeHistory">닫기</p>
          </button>
        </header>
          ${this.#historyListRender()}
        </div>
      </div>
        `;
        app.insertAdjacentHTML('beforeend', HTML);
        this.hide();
    }

    #historyListRender = () => {
        if(this.#historyList.length === 0) {
          return `
          <section class='history__list--empty' id='history-list'>
            <p>사용자 활동 기록이 없습니다.</p>
          </section>
          `
        }
        else{
          return `
            <ul class="history__list" id='history-list'>
              ${this.#historyList.map((history) => this.#historyCardRender(history)).join("")}
              <button class="js-deleteHistory history__delete-all-btn">기록 전체 삭제</button>
            </ul>
            
          `;
        }
      };

      #historyCardRender(history){
        let content;
        switch(history.type){
            case '등록' : content = `
                  <p class="history-card__content">
                  <strong>${history.cardTitle}</strong>을(를) <strong>${history.from}</strong>에
                  <strong>${history.type}</strong>하였습니다.
                </p>
                  `;
          
            case '변경' : //fall-through
            case '삭제' : 
                content = `
                  <p class="history-card__content">
                  <strong>${history.cardTitle}</strong>을(를) <strong>${history.type}</strong>하였습니다.
                </p>
                  `;
          
          case '이동' :
              content = `
                  <p class="history-card__content">
                  <strong>${history.cardTitle}</strong>을(를) <strong>${history.from}</strong>에서
                  <strong>${history.to}</strong>으로 <strong>${history.type}</strong>하였습니다.
                </p>
                  `;
        }
        let HTML = `
        <li class="history-card">
            <img src="/assets/frog.svg" alt="profile" class="history-card__profile" />
            <section class="history-card__main">
                <h5 class="history-card__username">@${history.username}</h5>
                ${content}
                <footer class="history-card__time">${getElapsedTime(history.time)}</footer>
            </section>
        </li>
        `
        return HTML;
    }
}

export const history = new History({});