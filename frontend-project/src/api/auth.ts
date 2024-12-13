import apiClient from "./client";

/**
 * Represents the response from the server when the user logs in
 */
interface LoginResponse {
  /** The Jwt auth token for the logged-in user */
  access_token: string;
}

/**
 * Represents the user input payload to use when sending the post request to the server for login
 */
interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Sends the provided `payload` as a post request to the login endpoint on the server to log the user in. Returns the
 * Jwt authentication token for the user if successful.
 * @param payload The login data payload containing the `email` and `password` of the user
 */
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await apiClient.post('/auth/login', payload);
  return response.data;
};