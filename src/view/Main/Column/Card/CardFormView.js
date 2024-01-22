const ButtonView = ({ color, bgColor, text, target, type = "button", disabled = "" }) => {
  return `
    <button style="color:${color}; background-color:${bgColor};" class="js-${target} btn" type="${type}" ${disabled}>${text}</button>    
    `;
};

//Todo - remove target
export const AddCardFormView = (target) => {
  return `
    <form class="js-${target} card-form">
      <input placeholder="제목을 변경하세요" class="card-form__title" name="title" type="text" required/>
      <textarea placeholder="내용을 입력하세요" class="card-form__content" name="content" required></textarea>
      <div class="card-form__btn-list">
        ${ButtonView({
          color: "#6e7191",
          bgColor: "#f7f7fc",
          text: "취소",
          target: target + "Cancel",
        })}
        ${ButtonView({
          color: "#fefefe",
          bgColor: "#007aff",
          text: "등록",
          target: target + "Submit",
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
