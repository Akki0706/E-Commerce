import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  http = inject(HttpClient);
  wishlists: Product[] = [];

  init(): void {
    this.getWishlists().subscribe((result) => {
      this.wishlists = result;
    });
  }

  getWishlists(): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.apiUrl + '/customer/wishlists'
    );
  }

  addInWishlists(productId: string): Observable<void> {
    return this.http.post<void>(
      environment.apiUrl + '/customer/wishlists/' + productId, {}
    );
  }

  removeFromWishlists(productId: string): Observable<void> {
    return this.http.delete<void>(
      environment.apiUrl + '/customer/wishlists/' + productId
    );
  }


}
