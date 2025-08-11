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
    _id: string;
    fullName: string;
    email: string;
    accountType: string;
    serviceType: string;
    nationalIdImage?: { secure_url: string; public_id: string };
    driverLicenseImage?: { secure_url: string; public_id: string };
    carLicenseImage?: { secure_url: string; public_id: string };
    additionalDocuments?: { secure_url: string; public_id: string };
    profiePicture?: { secure_url: string; public_id: string };
    carImages?: Array<{ secure_url: string; public_id: string; _id: string; id: string }>;
    createdAt: string;
    updatedAt: string;
    isConfirmed?: boolean;
    password?: string;
    __v?: number;
    attemptCount?: number;
    emailOTP?: string;
    otpExpiresAt?: string;
    id?: string;
  }

  
  