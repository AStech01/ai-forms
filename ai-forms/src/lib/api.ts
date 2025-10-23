
// import axios, { AxiosInstance } from 'axios';
// import {
//   LoginRequest,
//   RegisterRequest,
//   User,
//   Form,
//   Submission,
//   GenerateFormRequest,
//   LoginResponse,
//   ApiError,
// } from '../types/api';

// const api: AxiosInstance = axios.create({
//   baseURL: 'http://localhost:5000',
//   headers: { 'Content-Type': 'application/json' },
// });

// export const setAuthToken = (token: string | null) => {
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     if (typeof window !== 'undefined') localStorage.setItem('token', token);
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//     if (typeof window !== 'undefined') localStorage.removeItem('token');
//   }
// };

// // ✅ Safe check for browser environment
// if (typeof window !== 'undefined') {
//   const savedToken = localStorage.getItem('token');
//   if (savedToken) setAuthToken(savedToken);
// }

// const handleApiError = (error: unknown): ApiError => {
//   if (axios.isAxiosError(error)) {
//     return {
//       message: error.response?.data?.message || 'An error occurred',
//       status: error.response?.status || 500,
//     };
//   }
//   return { message: 'An unexpected error occurred', status: 500 };
// };

// // --- Auth APIs ---
// export const registerUser = async (data: RegisterRequest): Promise<LoginResponse> => {
//   const response = await api.post('/api/auth/signup', data);
//   if (response.data.token) setAuthToken(response.data.token);
//   return response.data;
// };

// export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
//   const response = await api.post('/api/auth/login', data);
//   if (response.data.token) setAuthToken(response.data.token);
//   return response.data;
// };

// export const getCurrentUser = async (): Promise<User> => {
//   const response = await api.get('/api/auth/me');
//   return response.data;
// };



// export const generateForm = async (data: GenerateFormRequest): Promise<Form> => {
//   try {
//     const response = await api.post('/api/forms/generate', data);
//     return response.data;
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };

// export const getMyForms = async (): Promise<Form[]> => {
//   try {
//     const response = await api.get('/api/forms/my-forms');
//     return response.data;
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };

// export const searchMyForms = async (query: string): Promise<Form[]> => {
//   try {
//     const response = await api.get(
//       `/api/forms/search/my-forms?q=${encodeURIComponent(query)}`
//     );
//     return response.data;
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };

// export const getPublicForm = async (id: string): Promise<Form> => {
//   try {
//     const response = await api.get(`/api/forms/${id}`);
//     return response.data;
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };

// export const deleteForm = async (id: string): Promise<void> => {
//   try {
//     await api.delete(`/api/forms/${id}`);
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };

// // ============================
// // 📬 Submission APIs
// // ============================

// export const submitForm = async (
//   formId: string,
//   data: Record<string, any>,
//   token?: string
// ): Promise<Submission> => {
//   try {
//     const config = token
//       ? { headers: { Authorization: `Bearer ${token}` } }
//       : undefined;
//     const response = await api.post(`/api/submissions/${formId}`, data, config);
//     return response.data;
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };

// export const getSubmissions = async (formId: string): Promise<Submission[]> => {
//   try {
//     const response = await api.get(`/api/submissions/${formId}`);
//     return response.data;
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };

// export const deleteSubmission = async (submissionId: string): Promise<void> => {
//   try {
//     await api.delete(`/api/submissions/${submissionId}`);
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };

// export default api;


import axios, { AxiosInstance } from 'axios';
import {
  LoginRequest,
  RegisterRequest,
  User,
  Form,
  Submission,
  GenerateFormRequest,
  LoginResponse,
  ApiError,
} from '../types/api';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000', 
  headers: { 'Content-Type': 'application/json' },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if (typeof window !== 'undefined') localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    if (typeof window !== 'undefined') localStorage.removeItem('token');
  }
};

if (typeof window !== 'undefined') {
  const savedToken = localStorage.getItem('token');
  if (savedToken) setAuthToken(savedToken);
}

const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status || 500,
    };
  }
  return { message: 'An unexpected error occurred', status: 500 };
};

// --- Auth APIs ---
export const registerUser = async (data: RegisterRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post('/api/auth/signup', data);
    if (response.data.token) setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post('/api/auth/login', data);
    if (response.data.token) setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get('/api/auth/me');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// --- Form APIs ---
export const generateForm = async (data: GenerateFormRequest): Promise<Form> => {
  try {
    const response = await api.post('/api/forms/generate', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getMyForms = async (): Promise<Form[]> => {
  try {
    const response = await api.get('/api/forms/my-forms');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getPublicForm = async (id: string): Promise<Form> => {
  try {
    const response = await api.get(`/api/forms/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteForm = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/forms/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

// --- Submission APIs ---
export const submitForm = async (
  formId: string,
  data: Record<string, any>,
  token?: string
): Promise<Submission> => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
    const response = await api.post(`/api/submissions/${formId}`, data, config);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// export const getSubmissions = async (formId: string): Promise<Submission[]> => {
//   try {
//     const response = await api.get(`/api/submissions/${formId}`);
//     return response.data;
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };
export async function getSubmissions(formId: string) {
  const res = await fetch(`/api/submissions/${formId}`);
  if (!res.ok) throw new Error('Failed to fetch submissions');
  return res.json();
}
export const deleteSubmission = async (submissionId: string): Promise<void> => {
  try {
    await api.delete(`/api/submissions/${submissionId}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

export default api;
