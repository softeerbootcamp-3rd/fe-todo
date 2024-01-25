import {
  API_BASE_URL,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  httpPut,
} from "./http";

export const insert_after = "after";
export const insert_before = "before";

export async function getTodoList() {
  return (await httpGet(`${API_BASE_URL}/todos`)).json();
}

export async function addTodoListItem(title, item) {
  return (await httpPost(`${API_BASE_URL}/todos/${title}`, item)).json();
}

export async function removeTodoListItem(colTitle, item) {
  return httpDelete(`${API_BASE_URL}/todos/${colTitle}/${item.id}`);
}

export async function editTodoListItem(colTitle, item) {
  return (
    await httpPatch(`${API_BASE_URL}/todos/${colTitle}/${item.id}`, item)
  ).json();
}

export async function moveTodoListItem(
  titleSrc,
  idSrc,
  titleDst,
  idDst,
  position
) {
  return await httpPut(
    `${API_BASE_URL}/todos/${titleSrc}/${idSrc}?titleDst=${titleDst}&idDst=${idDst}&position=${position}`
  );
}
