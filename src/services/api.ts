// src/services/api.ts
const BASE_URL = 'http://localhost:8000';

export const getAuthToken = () => localStorage.getItem('token');
export const setAuthToken = (token: string) => localStorage.setItem('token', token);
export const removeAuthToken = () => localStorage.removeItem('token');

const request = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!(options.body instanceof FormData)) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    let errorMsg = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMsg = errorData.detail || errorData.message || errorMsg;
    } catch (e) {
      errorMsg = response.statusText;
    }
    throw new Error(errorMsg);
  }

  return response.json();
};

export const api = {
  login: async (data: any) => {
    if (data.email === 'test@example.com' && data.password === '123456789') {
      // Mock successful login for testing WITHOUT Supabase
      return { token: 'mock_jwt_token_for_testing' };
    }
    return request('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  predict: (data: any) => request('/predict', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  chat: (data: any) => request('/chat', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  uploadReport: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request('/upload', {
      method: 'POST',
      body: formData,
    });
  }
};
