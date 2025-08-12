import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface CloudinaryImage {
  secure_url: string;
  public_id: string;
}

export interface AuthorizedUser {
  user: {
    _id: string;
    fullName: string;
    id: string;
  };
  role: string;
}

export interface RestaurantApiResponse {
  _id: string;
  name: string;
  cuisine: string;
  rating: number;
  phone: string;
  websiteLink: string;
  deliveryTime: string;
  discripion: string;
  distance: string;
  image: CloudinaryImage;
  menuImages: CloudinaryImage[];
  isOpen: boolean;
  createdBy: string;
  authorizedUsers: AuthorizedUser[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponse {
  message: string;
  count: number;
  data: RestaurantApiResponse[];
}

// Mapped interface for component use
export interface RestaurantData {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  discripion: string;
  distance: string;
  phone?: string; 
  websiteLink: string; 
  image: { url: string }[];
  menu: { url: string }[];
  isOpen: boolean;
  sites: string[]; // Not in API response
  createdBy: string;
  authorizedUsers: AuthorizedUser[];
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class Restaurant {
  private api = 'https://multiservice-production-1288.up.railway.app/auth/getOwnerRestaurants';
  
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!authToken) {
      throw new Error('No authentication token found');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
      // Include refresh token if needed by your API
      'X-Refresh-Token': refreshToken || ''
    });
  }

  getOwnerRestaurants(): Observable<{ restaurants: RestaurantData[], message: string, count: number }> {
    try {
      const headers = this.getAuthHeaders();
      
      return this.http.get<ApiResponse>(this.api, { headers })
        .pipe(
          map((response: ApiResponse) => {
            // Transform API response to component-friendly format
            const restaurants = response.data.map(restaurant => this.transformRestaurant(restaurant));
            return {
              restaurants,
              message: response.message,
              count: response.count
            };
          }),
          catchError((error) => {
            console.error('Error fetching restaurants:', error);
            
            // Handle different error scenarios
            if (error.status === 401) {
              // Token expired or invalid - you might want to refresh token here
              console.error('Authentication failed - token may be expired');
              // Optionally redirect to login or refresh token
            } else if (error.status === 403) {
              console.error('Access forbidden - insufficient permissions');
            } else if (error.status === 0) {
              console.error('Network error - check internet connection');
            }
            
            return throwError(() => error);
          })
        );
    } catch (error) {
      console.error('Error setting up request:', error);
      return throwError(() => error);
    }
  }

  private transformRestaurant(apiRestaurant: RestaurantApiResponse): RestaurantData {
    return {
      id: apiRestaurant._id,
      name: apiRestaurant.name,
      cuisine: apiRestaurant.cuisine,
      rating: apiRestaurant.rating,
      websiteLink: apiRestaurant.websiteLink,
      discripion: apiRestaurant.discripion,
      phone: apiRestaurant.phone,
      deliveryTime: apiRestaurant.deliveryTime,
      distance: apiRestaurant.distance,
      image: [{ url: apiRestaurant.image.secure_url }], // Convert single image to array format
      menu: apiRestaurant.menuImages.map(img => ({ url: img.secure_url })),
      isOpen: apiRestaurant.isOpen,
      sites: [], // Not provided by API - you might want to add this field to your API
      createdBy: apiRestaurant.createdBy,
      authorizedUsers: apiRestaurant.authorizedUsers,
      createdAt: apiRestaurant.createdAt,
      updatedAt: apiRestaurant.updatedAt
    };
  }

  // Method to refresh token if needed
  refreshAuthToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const refreshUrl = 'https://multiservice-production-1288.up.railway.app/auth/refresh'; // Adjust URL as needed
    
    return this.http.post(refreshUrl, { refreshToken })
      .pipe(
        catchError((error) => {
          console.error('Token refresh failed:', error);
          // Clear tokens and redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          return throwError(() => error);
        })
      );
  }

  // Helper method to check if user is authenticated
  isAuthenticated(): boolean {
    const authToken = localStorage.getItem('authToken');
    return !!authToken;
  }

  // Helper method to clear authentication
  clearAuth(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }
}