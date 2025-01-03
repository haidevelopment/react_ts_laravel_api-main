import { AxiosResponse } from "axios";
import { registerInterface } from "../../interfaces/registerInterface";
import { AuthResponse, LoginRequest } from "../../interfaces/authInterface";
import instance from "../../utils/Requests/instance";



const authService = {
  /**
   * Login service function
   * @param data LoginRequest
   * @returns Promise<AuthResponse>
   */
  login: (data: LoginRequest): Promise<AxiosResponse<AuthResponse>> => {
    return instance.post<AuthResponse>("login", data);
  },

  /**
   * Register service function
   * @param data RegisterRequest
   * @returns Promise<void>
   */
  register: (data: registerInterface): Promise<AxiosResponse<void>> => {
    return instance.post<void>("/register", data);
  },

  /**
   * Logout service function
   * @returns Promise<void>
   */
  logout: (): Promise<AxiosResponse<void>> => {
    return instance.post<void>("/logout");
  },
  /**
   * get data
   * @return Promise<AuthResponse>
   */
  getUser: (): Promise<AxiosResponse<AuthResponse>> => {
    return instance.get("/user");
  },
};

export { authService };
