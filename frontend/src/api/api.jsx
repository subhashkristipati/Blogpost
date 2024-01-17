import axios from 'axios';

const API_URL = 'https://blog-post-backend-ytdu.onrender.com';
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const handleResponse = (response) => {
    // console.log(response);
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code,
        };
    }
};

const handleError = (error) => {
    if (error.response) {
        if (error.response?.status === 403) {
            sessionStorage.clear();
        } else {
            console.error('ERROR IN RESPONSE: ', error.toJSON());
            return {
                isError: true,
                msg: 'API request failed',
                code: error.response.status,
            };
        }
    } else if (error.request) {
        console.error('ERROR IN RESPONSE: ', error.toJSON());
        return {
            isError: true,
            msg: 'No response received from the server',
            code: '',
        };
    } else {
        console.error('ERROR IN RESPONSE: ', error.toJSON());
        return {
            isError: true,
            msg: 'Network error',
            code: '',
        };
    }
};

const api = {
    get: async (url, params) => {
        try {
            const response = await axiosInstance.get(url, { params });
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },
    post: async (url, data) => {
        try {
            const response = await axiosInstance.post(url, data);
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },
    put: async (url, data) => {
        try {
            const response = await axiosInstance.put(url, data);
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },
    delete: async (url) => {
        try {
            const response = await axiosInstance.delete(url);
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },
};

export default api;

