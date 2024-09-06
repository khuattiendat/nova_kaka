import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const createExamUser = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/exam-users/create`, data, {
        withCredentials: true,
    });
    return response.data;
}
export const checkUserExit = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/exam-users/check-user-exit`, data, {
        withCredentials: true,
    });
    return response.data;
}