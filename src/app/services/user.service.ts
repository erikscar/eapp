import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import User from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = "http://localhost:5104/api/User";

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getUser(): Observable<User> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.apiUrl}/profile`, { headers });
  }

  updateUser(data: any): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.put<User>(`${this.apiUrl}`, data, { headers })
  }

  // postCart(data: any): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

  //   return this.http.post("http://localhost:5104/api/User" , data, { headers })
  // }
}
