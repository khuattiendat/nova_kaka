import axios from "axios";
import {jwtDecode as jwt_decode} from 'jwt-decode';

const URL = process.env.REACT_APP_SERVER_URL
const refreshToken = async () => {
    try {
        const res = await axios.post(`${URL}/api/v1/users/refresh-token`, {}, {
                withCredentials: true
            }
        )
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
export const createAxios = () => {
    const accessToken = localStorage.getItem('accessToken');
    const newInstance = axios.create({
        baseURL: `${URL}`,
    });
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(accessToken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const dataRefresh = await refreshToken();
                localStorage.setItem('accessToken', dataRefresh?.accessToken);

                config.headers["token"] = "Bearer " + dataRefresh?.accessToken;
                config.headers["authorization"] = "Bearer " + dataRefresh?.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
};