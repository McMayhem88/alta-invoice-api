import apiClient from "./client";

interface LoginResponse {
  access_token: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await apiClient.post('/auth/login', payload);
  return response.data;
};