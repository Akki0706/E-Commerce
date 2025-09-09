// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Review } from '../types/review';

// @Injectable({
//   providedIn: 'root'
// })
// export class ReviewService {

//   private apiUrl = 'http://localhost:3000/api/reviews';

//   constructor(private http: HttpClient) {}

//   getReviews(productId: string): Observable<Review[]> {
//     return this.http.get<Review[]>(`${this.apiUrl}/product/${productId}`);
//   }

//   addReview(productId: string, review: Omit<Review, 'createdAt'>): Observable<Review> {
//     return this.http.post<Review>(`${this.apiUrl}/product/${productId}`, review);
//   }
// }

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../types/review';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  http = inject(HttpClient);

  constructor() { }

  getReviews(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/api/review/product/${productId}`);
  }

  addReview(productId: string, review: Omit<Review, 'createdAt'>): Observable<Review> {
    return this.http.post<Review>(`${environment.apiUrl}/api/review/product/${productId}`, review);
  }
}
