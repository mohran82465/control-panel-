import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private api: string = `https://multiservice-production-1288.up.railway.app/auth/loginAdmin`;
  private http = inject(HttpClient);

  login(body: { identifier: string; password: string }): Observable<any> {
    console.log('🌐 Making API call to:', this.api);
    console.log('📤 Request body:', body);
    
    return this.http.post(this.api, body);
  }

  // Helper method to get API URL for debugging
  getApiUrl(): string {
    return this.api;
  }

  // Helper method to check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Helper method to get access token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Helper method to get refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  // Helper method to get user info
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Helper method to logout
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  // Helper method to update tokens (useful for refresh token functionality)
  updateTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
}