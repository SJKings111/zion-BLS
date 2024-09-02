import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getBooksListApi = async () => {
    const response = await axios.get(API_URL+`/books`);
    return response.data;
};

export const addBookApi = async (body) => {
    const response = await axios.post(API_URL+`/books`, body);
    return response.data;
};

export const updateBookApi = async ({body, id}) => {
    const response = await axios.put(API_URL+`/books/${id}`, body);
    return response.data;
};

export const deleteBookApi = async (id) => {
    const response = await axios.delete(API_URL+`/books/${id}`);
    return id;
};