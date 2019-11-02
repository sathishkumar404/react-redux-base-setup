import axios from 'axios';


// eslint-disable-next-line import/prefer-default-export
export const axiosInstance = (restricted = true) => {
    const token = localStorage.getItem('user');
    const apiConfig = {
        baseURL: API_URL
    };
    if (restricted) {
        apiConfig.headers = { Authorization: `Bearer ${token}` };
    }
    return axios.create(apiConfig);
};
