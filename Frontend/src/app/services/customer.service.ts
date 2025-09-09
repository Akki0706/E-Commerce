import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';
import { Category } from '../types/category';
import { Brand } from '../types/brand';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);

  constructor(private router:Router) { }
  getNewProducts():Observable<Product[]>{
    return this.http.get<Product[]>(
environment.apiUrl + '/customer/new-products'
    );
  }

  getFeaturedProducts(){
    return this.http.get<Product[]>(
environment.apiUrl + '/customer/featured-products'
    );
  }
  // getCategories() {
  //   return this.http.get<Category[]>(environment.apiUrl + '/customer/categories');
  // }
  
  // getCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(environment.apiUrl + '/customer/categories');
  // }
  
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/customer/categories`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirect to login page if unauthorized
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
  getBrands(){
    return this.http.get<Brand[]>(
environment.apiUrl + '/customer/brands'
    );
  }

  getProducts(
    searchTerm: string = '',
    categoryId: string = '',
    sortBy: string = 'price',
    sortOrder: number = -1,
    brandId: string = '',
    page: number = 1,
    pageSize: number = 10
  ) {
    let params = new HttpParams();
  
    if (searchTerm) {
      params = params.append('searchTerm', searchTerm);
    }
    if (categoryId) {
      params = params.append('categoryId', categoryId);
    }
    if (brandId) {
      params = params.append('brandId', brandId);
    }
    params = params
      .append('sortBy', sortBy)
      .append('sortOrder', sortOrder.toString())
      .append('page', page.toString())
      .append('pageSize', pageSize.toString());
  
    return this.http.get<Product[]>(`${environment.apiUrl}/customer/products`, { params });
  }
  
  getProductById(id:string){
    return this.http.get<Product>(
      environment.apiUrl + '/customer/product/' + id
    );
  }

  
}
