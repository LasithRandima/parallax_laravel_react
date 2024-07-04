import axios from 'axios';

const axiosApiClient = axios.create({
    baseURL: `${import.meta.env.VITE_LARAVEL_API_BASE_URL}/api`, // APP_URL - import.meta.env.APP_URL
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
});

// interceptors - excute special functions after/before sending requests.
axiosApiClient.interceptors.request.use((config) => {
    // do something before request is sent
    const token = localStorage.get('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosApiClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;
    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
    }

    throw error;
})
 
export default axiosApiClient;