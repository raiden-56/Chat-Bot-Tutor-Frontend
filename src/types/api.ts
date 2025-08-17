// API Types based on the OpenAPI specification
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterUserRequest {
  name: string;
  email: string;
  gender: string;
  role: string;
  phone_number: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface SetPasswordRequest {
  invitation_token: string;
  password: string;
}

export interface KidRequest {
  name: string;
  age: number;
  gender: string;
  school: string;
  standard: string;
}

export interface GetKidResponse {
  id: number;
  name: string;
  age: number;
  gender: string;
  school: string;
  standard: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface QuestionRequest {
  question: string;
}

export interface GetQuestionsHistoryResponse {
  id: string;
  question: string;
  answer: string;
  subject: string;
  created_at: string;
}

export interface ApiResponse<T> {
  status_message: string;
  data: T;
}

export interface GetApiResponse<T> {
  status_message: string;
  page?: number;
  page_size?: number;
  total_items?: number;
  data: T;
}

export interface UserInfoResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}