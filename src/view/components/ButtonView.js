export const ButtonView = ({ color, bgColor, text, target, type = "button", disabled = "" }) => {
  return `
    <button style="color:${color}; background-color:${bgColor};" class="js-${target} btn block-button" type="${type}" ${disabled}>${text}</button>    
    `;
};
