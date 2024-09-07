import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const createExam = async (payload) => {
    const res = await axios.post(`${BASE_URL}/api/exams/create`, payload, {
        withCredentials: true,
    });
    return res.data;
}
export const getAllExam = async () => {
    const res = await axios.get(`${BASE_URL}/api/exams/get-all`, {
        withCredentials: true,
    });
    return res.data;
}
export const getExamById = async (id) => {
    const res = await axios.get(`${BASE_URL}/api/exams/get-one/${id}`, {
        withCredentials: true,
    });
    return res.data;
}
export const updateExam = async (id, payload) => {
    const res = await axios.put(`${BASE_URL}/api/exams/update/${id}`, payload, {
        withCredentials: true,
    });
    return res.data;
}
export const deleteExam = async (id) => {
    const res = await axios.delete(`${BASE_URL}/api/exams/delete/${id}`, {
        withCredentials: true,
    });
    return res.data;
}
export const getExamComing = async () => {
    const res = await axios.get(`${BASE_URL}/api/exams/get-coming`, {
        withCredentials: true,
    });
    return res.data;
}
export const updateMemberExam = async (payload) => {
    const res = await axios.put(`${BASE_URL}/api/exams/update-member`, payload, {
        withCredentials: true,
    });
    return res.data;
}
export const getQuestionByIndex = async (payload) => {
    const res = await axios.post(`${BASE_URL}/api/exams/get-question`, payload, {
        withCredentials: true,
    });
    return res.data;
}
export const checkCountQuestion = async (id) => {
    const res = await axios.get(`${BASE_URL}/api/exams/check-count/${id}`, {
        withCredentials: true,
    });
    return res.data;
}
export const getMemberExam = async (id) => {
    const res = await axios.get(`${BASE_URL}/api/exams/get-member/${id}`, {
        withCredentials: true,
    });
    return res.data;
}