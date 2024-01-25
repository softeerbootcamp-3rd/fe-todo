const BASE_URL = "http://localhost:3000";

export const getInitialData = async () => {
  const fetchData = async (url, name) => {
    const response = await fetch(`${BASE_URL}${url}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${name} data from the server.`);
    }

    return response.json();
  };

  try {
    const dataUrls = ["/columns", "/cards", "/history"];
    return await Promise.all(
      dataUrls.map((url, index) => fetchData(url, ["column", "card", "history"][index]))
    );
  } catch (error) {
    console.error("Error fetching data from the server:", error.message);
  }
};
