const ButtonView = ({ color, bgColor, text, target, type = "button", disabled = "" }) => {
  return `
    <button style="color:${color}; background-color:${bgColor};" class="js-${target} btn" type="${type}" ${disabled}>${text}</button>    
    `;
};

export const deleteModalView = (text, target) => {
  return `
  <div class="modal-backdrop">
      <div class="delete-modal">
        <p class="delete-modal__text ">${text}</p>
        <div class="delete-modal__btn-wrapper">
        ${ButtonView({
          color: "#6e7191",
          bgColor: "#f7f7fc",
          text: "취소",
          target: target + "Cancel",
        })}
        ${ButtonView({
          color: "#fefefe",
          bgColor: "#ff3b30",
          text: "삭제",
          target: target + "Confirm",
        })}
        </div>
      </div>
    </div>
    `;
};
