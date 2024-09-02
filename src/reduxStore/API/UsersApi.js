import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getUsersListApi = async () => {
    const response = await axios.get(API_URL + `/users`);
    return response.data;
};

export const addUserApi = async (body) => {
    const response = await axios.post(API_URL + `/users`, body);
    return response.data;
};

export const updateUserApi = async ({ body, id }) => {
    const response = await axios.put(API_URL + `/users/${id}`, body);
    return response.data;
};

export const deleteUserApi = async (id) => {
    const response = await axios.delete(API_URL + `/users/${id}`);
    return id;
};