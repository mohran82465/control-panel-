import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersResponse } from '../context/dto';

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
