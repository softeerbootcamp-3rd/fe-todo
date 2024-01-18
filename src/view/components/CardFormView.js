import { ButtonView } from "./ButtonView.js";

export const CardFormView = (target) => {
  return `
    <form class="js-${target} card-form">
      <input placeholder="제목을 변경하세요" class="card-form__title" name="title" type="text" required/>
      <textarea placeholder="내용을 입력하세요" class="card-form__content" name="content" required></textarea>
      <div class="card-form__btn-list">
        ${ButtonView({
          color: "#6e7191",
          bgColor: "#f7f7fc",
          text: "취소",
          target: target === "editCard" ? "editFormCancel" : "addFormCancel",
        })}
        ${ButtonView({
          color: "#fefefe",
          bgColor: "#007aff",
          text: target === "editCard" ? "저장" : "등록",
          target: target === "editCard" ? "editFormSubmit" : "addFormSubmit",
          type: "submit",
          disabled: target === "editCard" ? "" : "disabled",
        })}
      </div>
  </form>    
    `;
};
