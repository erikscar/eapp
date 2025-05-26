import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  apiUrl: string = "http://localhost:5104/api/Review"
  constructor(private http: HttpClient) { }

  getAllReviewsFromProduct(productId: number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/${productId}`);
  }

  addReview(data: any, productId: number): Observable<any> {
   return this.http.post(`${this.apiUrl}/${productId}`, data);
  }
}
