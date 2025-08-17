import axios from 'axios';
import {
  LoginRequest,
  LoginResponse,
  RegisterUserRequest,
  ForgotPasswordRequest,
  SetPasswordRequest,
  KidRequest,
  GetKidResponse,
  QuestionRequest,
  GetQuestionsHistoryResponse,
  ApiResponse,
  GetApiResponse,
  UserInfoResponse,
  SuccessMessageResponse,
  GetUserDetailsResponse,
  UpdateUserRequest,
  UserResponse,
  ConfirmRegistrationRequest
} from '../types/api';

const API_BASE_URL = 'http://localhost:8000'; // Update this to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ---------------- AUTH & PUBLIC USER SERVICE ---------------- */
export const authAPI = {
  login: (data: LoginRequest) =>
    api.post<ApiResponse<LoginResponse>>('/login', data),

  verifyEmail: (email: string) =>
    api.get<ApiResponse<UserResponse>>(`/users/verify-email?email=${email}`),

  sendVerification: (data: RegisterUserRequest) =>
    api.post<ApiResponse<SuccessMessageResponse>>('/users/send-verification', data),

  createUser: (data: ConfirmRegistrationRequest) =>
    api.post<ApiResponse<UserResponse>>('/users', data),
  
  forgotPassword: (data: ForgotPasswordRequest) =>
    api.post<ApiResponse<UserResponse>>('/users/forgot-password', data),

  setPassword: (data: SetPasswordRequest) =>
    api.post<ApiResponse<UserResponse>>('/users/set-password', data),

  getUserInfo: () =>
    api.get<ApiResponse<UserInfoResponse>>('/users/info'),
};

/* ---------------- PROTECTED USER MANAGEMENT ---------------- */
export const usersAPI = {
  getAllUsers: (params?: {
    search?: string;
    filter_by?: string;
    filter_values?: string;
    sort_by?: string;
    order_by?: 'asc' | 'desc';
    page?: number;
    page_size?: number;
  }) =>
    api.get<GetApiResponse<GetUserDetailsResponse[]>>('/users', { params }),

  getUserById: (userId: number) =>
    api.get<ApiResponse<GetUserDetailsResponse>>(`/users/data/${userId}`),

  updateUserById: (userId: number, data: UpdateUserRequest) =>
    api.put<ApiResponse<UserResponse>>(`/users/data/${userId}`, data),
};

/* ---------------- KIDS MANAGEMENT ---------------- */
export const kidsAPI = {
  createKid: (data: KidRequest) =>
    api.post<ApiResponse<SuccessMessageResponse>>('/kids', data),

  getAllKids: (params?: {
    search?: string;
    filter_by?: string;
    filter_values?: string;
    sort_by?: string;
    order_by?: 'asc' | 'desc';
    page?: number;
    page_size?: number;
  }) =>
    api.get<GetApiResponse<GetKidResponse[]>>('/kids', { params }),

  getKidById: (kidId: number) =>
    api.get<ApiResponse<GetKidResponse>>(`/kids/${kidId}`),

  updateKid: (kidId: number, data: KidRequest) =>
    api.put<ApiResponse<SuccessMessageResponse>>(`/kids/${kidId}`, data),

  deleteKid: (kidId: number) =>
    api.delete<ApiResponse<SuccessMessageResponse>>(`/kids/${kidId}`),

  createQuestion: (kidId: number, data: QuestionRequest) =>
    api.post<ApiResponse<SuccessMessageResponse>>(`/kids/${kidId}/questions`, data),

  getQuestionsHistory: (kidId: number) =>
    api.get<ApiResponse<GetQuestionsHistoryResponse[]>>(
      `/kids/${kidId}/questions-history`
    ),
};

export default api;
