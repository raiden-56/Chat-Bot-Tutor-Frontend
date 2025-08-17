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
}

export interface QuestionRequest {
  question: string;
}

export interface GetQuestionsHistoryResponse {
  id: number;
  question: string;
  answer: string;
  created_at: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface GetApiResponse<T> {
  data: T;
}

export interface UserInfoResponse {
  id: number;
  name: string;
  email: string;
}

export interface SuccessResponse {
  message: string;
  success: boolean;
}
