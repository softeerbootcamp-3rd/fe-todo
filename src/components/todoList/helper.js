const onAddCountUp = (itemCount) => {
  itemCount.innerText = parseInt(itemCount.innerText) + 1;
};

const onDeleteCountDown = (itemCount) => {
  itemCount.innerText = parseInt(itemCount.innerText) - 1;
};

export { onAddCountUp, onDeleteCountDown };
