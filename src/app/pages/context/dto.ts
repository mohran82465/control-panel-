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
  
  export interface ServiceProvider {
    id: string;
    fullName: string;
    email?: string;
    phone?: string; 
    accountType: string;
    serviceType: string;
    nationalIdImage?: { secure_url: string };
    driverLicenseImage?: { secure_url: string };
    carLicenseImage?: { secure_url: string };
    additionalDocuments?: { secure_url: string };
    profiePicture?: { secure_url: string };
    carImages?: { secure_url: string }[];
  }
  