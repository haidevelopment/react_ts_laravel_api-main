export interface registerInterface {
    firstName: string;  
    lastName: string;  
    email: string;     
    password: string;  
    confirmPassword: string; 
    genre?: 'male' | 'female' | 'other'; 
    birth?: string;     
  }
  export interface ValidationErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }
  export interface RegisterResponse {
    data: {
      messages: string; 
    };
  }