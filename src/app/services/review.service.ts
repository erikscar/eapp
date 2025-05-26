import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  apiUrl: string = "http://localhost:5104/api/Review"
  constructor(private htpp: HttpClient) { }

  getAllReviewsFromProduct(productId: number) : Observable<any> {
    return this.htpp.get(`${this.apiUrl}/${productId}`);
  }
}
