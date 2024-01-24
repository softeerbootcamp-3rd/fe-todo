export const checkedFetch = async (input, init) => {
  try {
    const response = await fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(String(response.status));
    return await response.json();
  } catch (error) {
    throw error;
  }
};
