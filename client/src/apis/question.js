import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const createQuestion = async (data) => {
    const res = await axios.post(`${BASE_URL}/api/questions/create`, data, {
        withCredentials: true,
    })
    return res.data;
}
export const getAllQuestion = async () => {
    const res = await axios.get(`${BASE_URL}/api/questions/get-all`, {
        withCredentials: true,
    })
    return res.data;
}
export const getQuestionById = async (id) => {
    const res = await axios.get(`${BASE_URL}/api/questions/get-one/${id}`, {
        withCredentials: true,
    })
    return res.data;
}
export const updateQuestion = async (id, data) => {
    const res = await axios.put(`${BASE_URL}/api/questions/update/${id}`, data, {
        withCredentials: true,
    })
    return res.data;
}
export const deleteQuestion = async (id) => {
    const res = await axios.delete(`${BASE_URL}/api/questions/delete/${id}`, {
        withCredentials: true,
    })
    return res.data;
}