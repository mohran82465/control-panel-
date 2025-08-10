import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceProvider } from '../context/dto';
import { environment } from '../../../environments/environment';

// Define the exact API response structure based on your JSON
export interface GetAllUsersResponse {
  message: string;
  total: number;
  page: number;
  pages: number;
  data: ServiceProvider[];
}

@Injectable({
  providedIn: 'root'
})
export class UserProviderService {
  private readonly API = `${environment.apiUrl}/auth/getAllServiceProviders`;
  private http = inject(HttpClient);

  getAllUsers(service: string, page: number, limit: number): Observable<GetAllUsersResponse> {
    return this.http.get<GetAllUsersResponse>(
      `${this.API}?serviceType=${service}&page=${page}&limit=${limit}`
    );
  }
}