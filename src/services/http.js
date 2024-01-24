export const getData = () => {
    const data = fetch("http://localhost:3000/columnList", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
    return data;
};
