import { ButtonView } from "./ButtonView.js";

export const AddCardFormView = () => {
  return `
    <form class="add-form">
    <input placeholder="제목을 변경하세요" class="add-form__title"/>
    <textarea placeholder="내용을 입력하세요" class="add-form__content"></textarea>
    <div class="add-form__btn-list">
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
      })}
    </div>
  </form>    
    `;
};
