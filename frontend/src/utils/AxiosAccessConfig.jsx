import axios from "axios";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;



const AxiosInstanceAccess = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
})


AxiosInstanceAccess.interceptors.request.use((config) => {
    const access = localStorage.getItem('access');
    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
})


export default AxiosInstanceAccess;