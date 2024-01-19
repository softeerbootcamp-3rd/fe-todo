import { API_BASE_URL } from "../../constants/API";

export async function getTodoList() {
  return (await fetch(`${API_BASE_URL}/todos`)).json();
}
