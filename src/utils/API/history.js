import { API_BASE_URL } from "../../constants/API";

export async function getHistory() {
  return (await fetch(`${API_BASE_URL}/history`, { method: "GET" })).json();
}
