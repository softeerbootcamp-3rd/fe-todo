export async function httpGet(url, signal) {
  return await getRes(url, {
    method: "GET",
    signal: signal,
  });
}

export async function httpPost(url, body, signal) {
  return await getRes(url, {
    method: "POST",
    signal: signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function httpDelete(url, signal) {
  return await getRes(url, {
    method: "DELETE",
    signal: signal,
  });
}

export async function httpPut(url, body, signal) {
  return await getRes(url, {
    method: "PUT",
    signal: signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function httpPatch(url, body, signal) {
  return await getRes(url, {
    method: "PATCH",
    signal: signal,
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
