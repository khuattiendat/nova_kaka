import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const login = async (payload) => {
    const res = await axios.post(`${BASE_URL}/api/users/login`, payload, {
        withCredentials: true,
    });
    return res.data;
}
export const getAllUser = async () => {
    const res = await axios.get(`${BASE_URL}/api/users/get-all`, {
        withCredentials: true,
    });
    return res.data;
}
export const deleteUser = async (id) => {
    const res = await axios.delete(`${BASE_URL}/api/users/delete/${id}`, {
        withCredentials: true,
    });
    return res.data;
}
export const createUser = async (payload) => {
    const res = await axios.post(`${BASE_URL}/api/users/create`, payload, {
        withCredentials: true,
    });
    return res.data;
}