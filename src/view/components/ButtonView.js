export const ButtonView = ({ color, bgColor, text, target, type = "button" }) => {
  return `
    <button style="color:${color}; background-color:${bgColor};" class="js-${target} btn" type="${type}">${text}</button>    
    `;
};
