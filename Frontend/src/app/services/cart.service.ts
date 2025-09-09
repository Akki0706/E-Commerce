import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CartItem } from '../types/cartitem';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  http = inject(HttpClient);
  items:CartItem[]=[];
  constructor() { }
init(){
  this.getCartItems().subscribe((result:CartItem[])=>{
    this.items=result;

  })
}
  // getCartItems(): Observable<CartItem[]>{
  //   this.http.get<CartItem[]>(
  //     environment.apiUrl + '/carts'
  //   );
  // }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(environment.apiUrl + '/customer/carts');
  }
  

  addToCart(productId:string,quantity:number){
    return this.http.post(environment.apiUrl + '/customer/carts/' + productId,{
      quantity : quantity,
    });
  }

  removeFromCart(productId:string){
    return this.http.delete(environment.apiUrl + '/customer/carts/'+ productId);
  }

}
