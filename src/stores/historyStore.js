import { clearHistory, getHistory } from "../utils/API/history";
import { createStore } from "../utils/store";

export const historyStore = createStore((set, get) => ({
  history: [],
  async fetch() {
    const newHistory = await getHistory();
    set((state) => ({ ...state, history: newHistory }));
  },
  async clear() {
    await clearHistory();
    set((state) => ({ ...state, history: [] }));
  },
}));
