export const API_BASE_URL = "http://localhost:3333";

export function httpGet(url, signal) {
  return getRes(url, {
    method: "GET",
    signal,
  });
}

export function httpPost(url, body, signal) {
  return getRes(url, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function httpDelete(url, signal) {
  return getRes(url, {
    method: "DELETE",
    signal,
  });
}

export function httpPut(url, body, signal) {
  return getRes(url, {
    method: "PUT",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function httpPatch(url, body, signal) {
  return getRes(url, {
    method: "PATCH",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function getRes(url, options) {
  try {
    const res = await fetch(url, options);
    return res;
  } catch (e) {
    console.log(e);
  }
  return undefined;
}
