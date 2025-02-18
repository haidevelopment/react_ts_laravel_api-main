export interface LoginRequest {
  email: string;
  password: string;
}
export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    genre: string;
    birth: Date;
    email_verified_at: boolean;
    password: undefined;
    remember_token: undefined;
    max_level_security: number;
    user: AddressInterface[];
    created_at: Date;
    updated_at: Date;
  };
}
export interface AuthState {
  user: AuthResponse | null;
  status: "idle" | "loading" | "failed";
}
export interface AddressInterface {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  address: string;
  note: string;
  user_id: number;
}
export interface APIError {
  response?: {
    data?: {
      errors?: {
        [key: string]: string[];
      };
    };
  };
}
