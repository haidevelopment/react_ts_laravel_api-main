
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
    created_at: Date;
    updated_at: Date;
  };
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

