// src/types/api.ts
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  isPublic: boolean;
}

export interface Submission {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface GenerateFormRequest {
  prompt: string;
}

export interface ApiError {
  message: string;
  status: number;
}