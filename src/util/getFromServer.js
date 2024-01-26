/*    Server    */

const getFromServer = async (url) => {
    const response = await fetch("http://127.0.0.1"+url);
    if(!response.ok) throw new Error(`Server Error - ${response.status}`);
    return await response.json();
}

const postToServer = async (url, data) => {
    const response = await fetch("http://127.0.0.1"+url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'localhost:6000'}
    });
    if(!response.ok) throw new Error(`Server Error - ${response.status}`);
    return await response.json();
}

const putToServer = async (url, data) => {
    const response = await fetch("http://127.0.0.1"+url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : 'localhost:6000'}
    });
    if(!response.ok) throw new Error(`Server Error - ${response.status}`);
    return await response.json();
}

const deleteFromServer = async (url) => {
    const response = await fetch("http://127.0.0.1"+url, {
        method: 'DELETE',
        headers:{'Access-Control-Allow-Origin' : 'localhost:6000'}
    });
    if(!response.ok) throw new Error(`Server Error - ${response.status}`);
    return await response.json();
}
   


/*     Card      */

export const getCardFromServer = async (cardData) => {
    const response = await getFromServer(`/api/card/${cardData.cardId}`);
    return response;
}

export const setCardToServer = async (cardData) => {
    const response = await postToServer(`/api/card/${cardData.cardId}`, cardData);
    return response;
}

export const editCardToServer = async (cardData) => {
    const response = await putToServer(`/api/card/${card.cardId}`, cardData);
    return response;
}

export const deleteCardFromServer = async (cardData) => {
    const response = await deleteFromServer(`/api/card/${cardData.cardId}`);
    return response;
}

export const moveCardToServer = async (cardData) => {
    const response = await putToServer(`/api/move/${cardData.cardId}/move`, cardData );
    return response;
}


/*    Column    */

export const setColumnToServer = async (columnData) => {
    const response = await postToServer(`/api/column/${columnData.columnId}`, columnData);
    return response;
}

export const editColumnToServer = async (columnData) => {
    const response = await putToServer(`/api/column/${columnData.columnId}`, columnData);
    return response;
}   

export const deleteColumnFromServer = async (columnData) => {
    const response = await deleteFromServer(`/api/column/${columnData.columnId}`);
    return response;
}