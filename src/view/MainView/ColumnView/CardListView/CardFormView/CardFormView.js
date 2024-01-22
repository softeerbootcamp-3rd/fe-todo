import { ButtonView } from "../../../../components/ButtonView.js";

//Todo - remove target
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
    `;
};

export const EditCardFormView = () => {
  return `
    <form class="js-editForm card-form--edit">
      <input placeholder="제목을 변경하세요" class="card-form__title" name="title" type="text" required/>
      <textarea placeholder="내용을 입력하세요" class="card-form__content" name="content" required></textarea>
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
};
