import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error("VITE_API_URL is not defined");
}

const api = axios.create({
    baseURL: API_URL,
});

export const employeeApi = {
    getAll: () => api.get('/employees/'),
    create: (data) => api.post('/employees/', data),
    delete: (id) => api.delete(`/employees/${id}`),
};

export const attendanceApi = {
    getAll: (date) => api.get('/attendance/', { params: { date } }),
    getEmployeeAttendance: (employeeId) => api.get(`/attendance/${employeeId}`),
    mark: (data) => api.post('/attendance/', data),
    getSummary: () => api.get('/attendance/summary/stats'),
};

export default api;
