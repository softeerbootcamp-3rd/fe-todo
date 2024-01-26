const BASE_URL = "http://localhost:3000";

const getData = async (url, name) => {
  const response = await fetch(`${BASE_URL}${url}`);
  if (!response.ok) {
    throw new Error(`Failed to get ${name} data from the server.`);
  }
  return response.json();
};

const sendData = async ({ url, name, data, method }) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to send ${name} data from the server.`);
  }
  return response.json();
};

export const getInitialData = () => {
  try {
    const dataUrls = ["/columns", "/cards", "/history"];
    return Promise.all(
      dataUrls.map((url, index) => getData(url, ["column", "card", "history"][index]))
    );
  } catch (error) {
    console.error("Error fetching data from the server:", error.message);
  }
};

export const postNewCard = (cardData) => {
  // 서버에 POST 요청을 보내어 새로운 카드 추가
  try {
    return sendData({ url: "/cards", name: "card", data: cardData, method: "POST" });
  } catch (error) {
    console.error("Error fetching data from the server:", error.message);
    throw error;
  }
};

export const postNewHistory = (newHistory) => {
  try {
    return sendData({ url: "/history", name: "history", data: newHistory, method: "POST" });
  } catch (error) {
    console.error("Error fetching data from the server:", error.message);
    throw error;
  }
};

export const putColumn = (columnData, columnId) => {
  try {
    return sendData({
      url: `/columns/${columnId}`,
      name: columnId,
      data: columnData,
      method: "PUT",
    });
  } catch (error) {
    console.error("Error adding card to the server:", error.message);
    throw error;
  }
};
export const patchCard = (id, cardData) => {
  try {
    return sendData({
      url: `/cards/${id}`,
      name: `card${id}`,
      data: cardData,
      method: "PATCH",
    });
  } catch (error) {
    console.error("Error edit card to the server:", error.message);
    throw error;
  }
};

export const deleteAllHistory = (historyIdList) => {
  try {
    return Promise.all(
      historyIdList.map((id) =>
        sendData({
          url: `/history/${id}`,
          name: `/history${id}`,
          data: null,
          method: "DELETE",
        })
      )
    );
  } catch (error) {
    console.error("Error delete history in server:", error.message);
    throw error;
  }
};
