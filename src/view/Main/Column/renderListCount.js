import { columnDataTable } from "../../../model/model";

export const renderListCount = (currentColumn) => {
  const countElement = currentColumn.querySelector(".column__nav__info__count");
  const count = columnDataTable[currentColumn.id].value.length;
  countElement.textContent = count;
};
