import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Category } from '../../interfaces/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  apiUrl: string = "http://localhost:5104/api/Category"
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllCategories(): Observable<any> {
    return this.http.get<Category>(`${this.apiUrl}`, { headers: this.authService.getHeaders()})
  }

  addCategory(data: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}`, data, { headers: this.authService.getHeaders() })
  }

  adminUpdateCategory(data: Category, id: number): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, data, { headers: this.authService.getHeaders() })
  }

  getCategoryBySearchValue(searchValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?searchValue=${searchValue}`)
  }

  removeCategory(id: number): Observable<any> {
    return this.http.delete<Category>(`${this.apiUrl}/${id}`, { headers: this.authService.getHeaders() });
  }
}
