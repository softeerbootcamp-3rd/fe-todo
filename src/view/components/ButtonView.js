export const ButtonView = ({ color, bgColor, text, target }) => {
  return `
    <button style="color:${color}; background-color:${bgColor};" class="js-${target} btn">${text}</button>    
    `;
};
