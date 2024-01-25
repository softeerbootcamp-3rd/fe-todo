export const API_BASE_URL = "http://localhost:3333";

export function httpGet(url, signal) {
  return fetch(url, {
    method: "GET",
    signal,
  });
}

export function httpPost(url, body, signal) {
  return fetch(url, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function httpDelete(url, signal) {
  return fetch(url, {
    method: "DELETE",
    signal,
  });
}

export function httpPut(url, body, signal) {
  return fetch(url, {
    method: "PUT",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function httpPatch(url, body, signal) {
  return fetch(url, {
    method: "PATCH",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
