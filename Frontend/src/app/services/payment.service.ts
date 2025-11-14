import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class PaymentService {
  constructor(private http: HttpClient) {}

  createOrder(amountInPaise: number) {
    return this.http.post<any>(`${environment.apiUrl}/api/create-order`, { amount: amountInPaise });
  }

  verifyPayment(payload: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/verify-payment`, payload);
  }
}
