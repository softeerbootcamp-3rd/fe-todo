import { store } from "@/model/Store";

export const renderListCount = (currentColumn) => {
  const countElement = currentColumn.querySelector(".column__nav__info__count");
  const count = store.getColumn(currentColumn.id).value.length;
  countElement.textContent = count;
};
