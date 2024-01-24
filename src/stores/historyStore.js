import { getHistory } from "../utils/API/history";
import { createStore } from "../utils/store";

export const historyStore = createStore((set, get) => ({
  history: getHistory(),
  fetch() {
    set((state) => ({ ...state, history: getHistory() }));
  },
  clear() {
    set((state) => ({ ...state, history: [] }));
  },
}));
