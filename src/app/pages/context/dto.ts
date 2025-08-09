export interface USER {
    id: string;
    fullName: string;
    phone?: string;
    email?: string;
    accountType?: string;
  }
  
  export interface UsersResponse {
    message: string;
    total: number;
    page: number;
    pages: number;
    data: USER[];
  }
  