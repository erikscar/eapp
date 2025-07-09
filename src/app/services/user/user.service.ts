import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, tap } from 'rxjs';
import User from '../../interfaces/User';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = "http://localhost:5104/api/User";

  constructor(private http: HttpClient, private authService: AuthService) { }


  register(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`, { headers: this.authService.getHeaders() })
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers: this.authService.getHeaders() })
  }

  getUsersBySearchValue(searchValue: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/search?searchValue=${searchValue}`, { headers: this.authService.getHeaders() }, )
  }

  updateUser(data: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}`, data, { headers: this.authService.getHeaders() })
  }

  adminUpdateUser(data: any, id:number):Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, data, { headers: this.authService.getHeaders() })
  }

  removeUser(userId: number): Observable<any> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}`, { headers: this.authService.getHeaders() })
  }
}
