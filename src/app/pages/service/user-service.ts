import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UsersResponse } from '../context/dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API=`${environment.apiUrl}/auth/getAllNormalUsers`
  private http = inject(HttpClient); 

  getAllUsers(page: number, limit: number) {
    return this.http.get<UsersResponse>(`${this.API}?page=${page}&limit=${limit}`);
  }
}
