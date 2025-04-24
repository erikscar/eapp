import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

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
}
