import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiUrl: string = "http://localhost:5104/api/Dashboard"
  constructor(private http: HttpClient, private authService: AuthService) { }

  getLatestRecords(): Observable<any> {
    return this.http.get(`${this.apiUrl}/latest-records`, { headers: this.authService.getHeaders() })
  }
}
