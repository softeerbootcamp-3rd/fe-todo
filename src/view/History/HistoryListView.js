import { historyDataList } from "../../model/model.js";
import HistoryCardView from "./Card/index.js";

export const HistoryListView = () => {
  return `
      <ul class="history__list">
        ${historyDataList.map((history) => HistoryCardView(history)).join("")}
      </ul>
    `;
};
