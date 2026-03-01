import axios from 'axios'
import type { ApplicationPayload, Job, JobQueryParams, LoginPayload, RegisterPayload, UserInfo } from '../types'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo')

    if (userInfo) {
      const { token } = JSON.parse(userInfo) as UserInfo

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

export const jobService = {
  getJobs: (params?: JobQueryParams) => api.get<Job[]>('/jobs', { params }),
  getJobById: (id: string) => api.get<Job>(`/jobs/${id}`),
  createJob: (jobData: Omit<Job, '_id' | 'tag2'>) => api.post<Job>('/jobs', jobData),
  deleteJob: (id: string) => api.delete(`/jobs/${id}`),
}

export const applicationService = {
  submitApplication: (applicationData: ApplicationPayload) => api.post('/applications', applicationData),
}

export const authService = {
  login: (credentials: LoginPayload) => api.post<UserInfo>('/auth/login', credentials),
  register: (userData: RegisterPayload) => api.post<UserInfo>('/auth/register', userData),
}

export default api
