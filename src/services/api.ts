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
  SuccessResponse
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

export const authAPI = {
  login: (data: LoginRequest) => 
    api.post<ApiResponse<LoginResponse>>('/login', data),
  
  verifyEmail: (email: string) => 
    api.get<ApiResponse<SuccessResponse>>(`/users/verify-email?email=${email}`),
  
  sendVerification: (data: RegisterUserRequest) => 
    api.post<ApiResponse<SuccessResponse>>('/users/send-verification', data),
  
  forgotPassword: (data: ForgotPasswordRequest) => 
    api.post<ApiResponse<SuccessResponse>>('/users/forgot-password', data),
  
  setPassword: (data: SetPasswordRequest) => 
    api.post<ApiResponse<SuccessResponse>>('/users/set-password', data),
  
  getUserInfo: () => 
    api.get<ApiResponse<UserInfoResponse>>('/users/info'),
};

export const kidsAPI = {
  createKid: (data: KidRequest) => 
    api.post<ApiResponse<SuccessResponse>>('/kids', data),
  
  getAllKids: () => 
    api.get<GetApiResponse<GetKidResponse[]>>('/kids'),
  
  getKidById: (kidId: number) => 
    api.get<ApiResponse<GetKidResponse>>(`/kids/${kidId}`),
  
  updateKid: (kidId: number, data: KidRequest) => 
    api.put<ApiResponse<SuccessResponse>>(`/kids/${kidId}`, data),
  
  deleteKid: (kidId: number) => 
    api.delete<ApiResponse<SuccessResponse>>(`/kids/${kidId}`),
  
  createQuestion: (kidId: number, data: QuestionRequest) => 
    api.post<ApiResponse<SuccessResponse>>(`/kids/${kidId}/questions`, data),
  
  getQuestionsHistory: (kidId: number) => 
    api.get<ApiResponse<GetQuestionsHistoryResponse[]>>(`/kids/${kidId}/questions-history`),
};

export default api;