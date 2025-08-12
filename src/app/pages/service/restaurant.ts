import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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
  private apiUrl = `${environment.apiUrl}/auth/getOwnerRestaurants`;
  private http = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!authToken) throw new Error('No authentication token found');

    return new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
      'X-Refresh-Token': refreshToken || ''
    });
  }

  getOwnerRestaurants(): Observable<{ restaurants: RestaurantData[]; message: string; count: number }> {
    return this.http.get<ApiResponse>(this.apiUrl, { headers: this.getAuthHeaders() })
      .pipe(
        map((res:any) => ({
          restaurants: res.data.map((rs:any) => this.transformRestaurant(rs)),
          message: res.message,
          count: res.count
        })),
        catchError((error) => {
          console.error('Error fetching restaurants:', error);
          return throwError(() => error);
        })
      );
  }

  addRestaurant(formData: FormData) {
    return this.http.post(`${environment.apiUrl}/auth/createRestaurant`, formData, { headers: this.getAuthHeaders() });
  }

  private transformRestaurant(api: RestaurantApiResponse): RestaurantData {
    return {
      id: api._id,
      name: api.name,
      cuisine: api.cuisine,
      rating: api.rating,
      websiteLink: api.websiteLink,
      discripion: api.discripion,
      phone: api.phone,
      deliveryTime: api.deliveryTime,
      distance: api.distance,
  
      // ✅ Protect against null image
      image: api.image?.secure_url
        ? [{ url: api.image.secure_url }]
        : [],
  
      // ✅ Protect against null/empty menu images
      menu: Array.isArray(api.menuImages)
        ? api.menuImages
            .filter(img => img?.secure_url)
            .map(img => ({ url: img.secure_url }))
        : [],
  
      isOpen: api.isOpen,
      sites: [],
      createdBy: api.createdBy,
      authorizedUsers: api.authorizedUsers,
      createdAt: api.createdAt,
      updatedAt: api.updatedAt
    };
  }
  
}