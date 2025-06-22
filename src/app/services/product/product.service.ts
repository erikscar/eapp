import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/Product';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = "http://localhost:5104/api/Product"
  constructor(private http: HttpClient, private authService: AuthService) { }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl)
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  getProductByCategory(category: string) {
    return this.http.get(`${this.apiUrl}/category?category=${category}`);
  }

  getProductsBySearchValue(searchValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?searchValue=${searchValue}`)
  }

  addProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, data, {headers: this.authService.getHeaders()})
  }

  adminUpdateProduct(data: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data, { headers: this.authService.getHeaders() })
  }

  removeProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`, { headers: this.authService.getHeaders() });
  }
}
