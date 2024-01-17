import { ButtonView } from "./ButtonView.js";

export const CardFormView = (target) => {
  return `
    <form class="js-${target} card-form">
    <input placeholder="제목을 변경하세요" class="card-form__title" name="title"/>
    <textarea placeholder="내용을 입력하세요" class="card-form__content" name="content"></textarea>
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
      })}
    </div>
  </form>    
    `;
};
