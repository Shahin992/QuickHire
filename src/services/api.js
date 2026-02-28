import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const { token } = JSON.parse(userInfo);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const jobService = {
    getJobs: (params) => api.get('/jobs', { params }),
    getJobById: (id) => api.get(`/jobs/${id}`),
    createJob: (jobData) => api.post('/jobs', jobData),
    deleteJob: (id) => api.delete(`/jobs/${id}`),
};

export const applicationService = {
    submitApplication: (applicationData) => api.post('/applications', applicationData),
};

export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
};

export default api;
