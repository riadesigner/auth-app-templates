// Создаём экземпляр axios с интерцепторами
import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// Добавляем токен в каждый запрос
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обрабатываем 401 ошибку
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt');
    }
    return Promise.reject(error);
  }
);

export default api;