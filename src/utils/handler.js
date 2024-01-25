export const setEvent = (target, event, handler) => {
  target.addEventListener(event, handler);
};

export const removeEvent = (target, event, handler) => {
  target.removeEventListener(event, handler);
};
