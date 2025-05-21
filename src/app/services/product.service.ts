import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl: string = "http://localhost:5104/api/Product"
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl)
  }

  getProductsBySearchValue(searchValue: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?searchValue=${searchValue}`)
  }
}
