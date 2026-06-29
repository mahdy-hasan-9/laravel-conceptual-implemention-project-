
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const fetchNotifications = async (page = 1) => {
    const { data } = await api.get(`/notifications?page=${page}`);
    return data.data; // Laravel paginate response
};

export const markNotificationAsRead = async (id: string) => {
    const { data } = await api.post(`/notifications/${id}/read`);
    return data;
};