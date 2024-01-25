import { API_BASE_URL, httpDelete, httpGet } from "./http";

export async function getHistory() {
  return (await httpGet(`${API_BASE_URL}/history`)).json();
}

export async function clearHistory() {
  return httpDelete(`${API_BASE_URL}/history`);
}
