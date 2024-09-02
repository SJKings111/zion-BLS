import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getHistoryListApi = async () => {
    const response = await axios.get(API_URL + `/history`);
    return response.data;
};

export const borrowBookApi = async (body) => {
    const response = await axios.post(API_URL + `/history`, body);
    return response.data;
};

export const returnBookApi = async ({ body, id }) => {
    const response = await axios.put(API_URL + `/history/${id}`, body);
    return response.data;
};